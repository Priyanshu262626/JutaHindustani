package com.jutahindustani.service;

import com.jutahindustani.entity.Product;
import com.jutahindustani.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.searchProducts(query);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryNameIgnoreCase(category);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setTitle(productDetails.getTitle());
        product.setBrand(productDetails.getBrand());
        product.setDescription(productDetails.getDescription());
        product.setGender(productDetails.getGender());
        product.setColor(productDetails.getColor());
        product.setPrice(productDetails.getPrice());
        product.setDiscountPrice(productDetails.getDiscountPrice());
        product.setStock(productDetails.getStock());
        product.setCategory(productDetails.getCategory());
        
        if (productDetails.getProductImages() != null && !productDetails.getProductImages().isEmpty()) {
            product.getProductImages().clear();
            productDetails.getProductImages().forEach(img -> {
                img.setProduct(product);
                product.getProductImages().add(img);
            });
        }
        
        if (productDetails.getProductSizes() != null && !productDetails.getProductSizes().isEmpty()) {
            product.getProductSizes().clear();
            productDetails.getProductSizes().forEach(sz -> {
                sz.setProduct(product);
                product.getProductSizes().add(sz);
            });
        }

        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
