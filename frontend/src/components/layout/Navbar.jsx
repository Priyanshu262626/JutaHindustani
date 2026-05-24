import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, LogOut, Menu, X, User, Shield, Heart } from 'lucide-react';

export default function Navbar() {
  const { user, cart, logout, wishlist = [] } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Stark Black Logo */}
        <Link 
          to="/" 
          className="flex items-center text-xl font-extrabold tracking-widest text-black hover:opacity-80 transition-opacity"
        >
          JUTA HINDUSTANI
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/shop" 
            className={`text-sm font-bold tracking-wider uppercase transition-colors hover:text-black ${
              isActive('/shop') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
            }`}
          >
            Shop
          </Link>
          
          {user ? (
            <>
              {user.role === 'ROLE_ADMIN' ? (
                <>
                  <Link 
                    to="/admin" 
                    className={`flex items-center space-x-1 text-sm font-bold tracking-wider uppercase transition-colors hover:text-black ${
                      isActive('/admin') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                    }`}
                  >
                    <Shield size={16} />
                    <span>Admin</span>
                  </Link>
                  <span className="flex items-center space-x-1 text-gray-400 text-xs font-semibold uppercase">
                    <User size={13} className="text-black" />
                    <span>{user.name}</span>
                  </span>
                </>
              ) : (
                <>
                  <Link 
                    to="/orders" 
                    className={`text-sm font-bold tracking-wider uppercase transition-colors hover:text-black ${
                      isActive('/orders') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                    }`}
                  >
                    My Orders
                  </Link>
                  <span className="flex items-center space-x-1 text-gray-400 text-xs font-semibold uppercase">
                    <User size={13} className="text-black" />
                    <span>{user.name}</span>
                  </span>
                </>
              )}
              
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-0"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-sm font-bold tracking-wider uppercase text-gray-500 hover:text-black transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Wishlist Icon in Nav */}
          {(!user || user.role === 'ROLE_CUSTOMER') && (
            <Link 
              to="/wishlist" 
              className="relative p-1 text-black hover:opacity-75 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart size={22} className={wishlist.length > 0 ? "fill-black text-black" : "text-black"} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xxs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
          )}

          {/* Cart Icon in Nav */}
          {(!user || user.role === 'ROLE_CUSTOMER') && (
            <Link 
              to="/cart" 
              className="relative p-1 text-black hover:opacity-75 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xxs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center space-x-4">
          {(!user || user.role === 'ROLE_CUSTOMER') && (
            <>
              <Link to="/wishlist" className="relative p-1 text-black" aria-label="Wishlist">
                <Heart size={22} className={wishlist.length > 0 ? "fill-black text-black" : "text-black"} strokeWidth={2} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xxs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-1 text-black" aria-label="Cart">
                <ShoppingBag size={22} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xxs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-black hover:opacity-70 focus:outline-none bg-transparent border-0 cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-4 text-left">
          <Link 
            to="/shop" 
            onClick={() => setIsOpen(false)} 
            className="text-sm font-bold tracking-wider uppercase text-gray-900 hover:text-black"
          >
            Shop
          </Link>
          
          {user ? (
            <>
              {user.role === 'ROLE_ADMIN' ? (
                <>
                  <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center space-x-1.5 text-sm font-bold tracking-wider uppercase text-gray-900"
                  >
                    <Shield size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/orders" 
                    onClick={() => setIsOpen(false)} 
                    className="text-sm font-bold tracking-wider uppercase text-gray-900"
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/wishlist" 
                    onClick={() => setIsOpen(false)} 
                    className="text-sm font-bold tracking-wider uppercase text-gray-900"
                  >
                    My Favorites ({wishlist.length})
                  </Link>
                </>
              )}
              
              <div className="text-xs text-gray-400 font-semibold uppercase flex items-center space-x-1 pt-2">
                <User size={12} className="text-black" />
                <span>{user.name}</span>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-red-600 self-start bg-transparent border-0 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="text-sm font-bold tracking-wider uppercase text-gray-900"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
