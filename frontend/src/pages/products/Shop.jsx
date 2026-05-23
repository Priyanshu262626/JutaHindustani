import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import FilterSidebar from '../../components/common/FilterSidebar';
import ProductGrid from '../../components/common/ProductGrid';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['ALL', 'SNEAKERS', 'RUNNING', 'CASUAL', 'FORMAL'];
const ITEMS_PER_PAGE = 6; // Simple pagination mock constant

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('none');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'ALL';
    setCategory(urlCategory);
    setCurrentPage(1); // Reset page on category change
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const catParam = category === 'ALL' ? '' : category;
      const data = await api.products.getAll('', catParam);
      setProducts(data);
    } catch (err) {
      setError('Failed to load shoe catalog. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    setLoading(true);
    setCurrentPage(1);
    try {
      const data = await api.products.getAll(query, category === 'ALL' ? '' : category);
      setProducts(data);
    } catch (err) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setSearchParams(cat === 'ALL' ? {} : { category: cat });
    setCategory(cat);
    setSearch('');
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    return 0;
  });

  // Client-side pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter text-left">
            {category} Footwear ({products.length})
          </h1>
          
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-1.5 border border-neutral-300 rounded px-3 py-2 text-xs font-bold uppercase tracking-wider text-black cursor-pointer bg-white"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar (Left Column) */}
          <aside className="hidden lg:block">
            <FilterSidebar
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={handleCategoryClick}
              activeSearch={search}
              onSearchChange={handleSearch}
              activeSort={sortBy}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Catalog Listing (Right Column) */}
          <div className="lg:col-span-3 text-left">
            {loading ? (
              <LoadingSpinner fullPage message="Loading Shoe Catalog..." />
            ) : error ? (
              <div className="text-center py-16 border border-neutral-200 rounded-lg">
                <p className="text-sm font-semibold text-red-500">{error}</p>
                <button onClick={fetchProducts} className="nike-btn-black mt-4 text-xs cursor-pointer">
                  Reload Catalog
                </button>
              </div>
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />
                
                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sidebar overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-80 h-full p-6 text-left shadow-2xl overflow-y-auto flex flex-col space-y-6 animate-slideIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-black">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-400 hover:text-black bg-transparent border-0 cursor-pointer p-1"
              >
                <X size={20} />
              </button>
            </div>

            <FilterSidebar
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={handleCategoryClick}
              activeSearch={search}
              onSearchChange={handleSearch}
              activeSort={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      )}

    </div>
  );
}
