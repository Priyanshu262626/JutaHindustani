package com.jutahindustani;

import com.jutahindustani.entity.*;
import com.jutahindustani.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedRoles();
        seedCategories();
        seedUsers();
        seedProducts();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(RoleEntity.builder().name("ROLE_CUSTOMER").build());
            roleRepository.save(RoleEntity.builder().name("ROLE_ADMIN").build());
            System.out.println("Database Seeding: Roles seeded successfully!");
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            categoryRepository.save(Category.builder().name("SNEAKERS").build());
            categoryRepository.save(Category.builder().name("RUNNING").build());
            categoryRepository.save(Category.builder().name("CASUAL").build());
            categoryRepository.save(Category.builder().name("FORMAL").build());
            System.out.println("Database Seeding: Categories seeded successfully!");
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Seed Admin User
            User admin = User.builder()
                    .name("test")
                    .email("test@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);

            // Seed Customer User
            User customer = User.builder()
                    .name("test1")
                    .email("test1@gmail.com")
                    .password(passwordEncoder.encode("customer123"))
                    .role(Role.ROLE_CUSTOMER)
                    .build();
            User savedCustomer = userRepository.save(customer);

            // Initialize shopping cart for customer
            Cart cart = Cart.builder()
                    .user(savedCustomer)
                    .build();
            cartRepository.save(cart);

            System.out.println("Database Seeding: Admin and Customer users created successfully!");
            System.out.println("Admin login: test@gmail.com / admin123");
            System.out.println("Customer login: test1@gmail.com / customer123");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            Category sneakers = categoryRepository.findByNameIgnoreCase("SNEAKERS").orElse(null);
            Category running = categoryRepository.findByNameIgnoreCase("RUNNING").orElse(null);
            Category casual = categoryRepository.findByNameIgnoreCase("CASUAL").orElse(null);
            Category formal = categoryRepository.findByNameIgnoreCase("FORMAL").orElse(null);

            // Product 1
            Product p1 = Product.builder()
                    .title("Air Max Premium")
                    .brand("Nike")
                    .description("Premium air-cushioned lifestyle sneakers. Engineered for supreme everyday comfort and style, featuring breathable mesh and sleek design lines.")
                    .gender("Unisex")
                    .color("Multicolor")
                    .price(8999.0)
                    .discountPrice(7999.0)
                    .stock(50)
                    .category(sneakers)
                    .build();
            p1.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/nike-airmax.jpg").product(p1).build());
            for (String sizeStr : new String[]{"7", "8", "9", "10"}) {
                p1.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(12).product(p1).build());
            }
            productRepository.save(p1);

            // Product 2
            Product p2 = Product.builder()
                    .title("Ultraboost Running")
                    .brand("Adidas")
                    .description("High-performance running shoes featuring signature Boost cushioning, primeknit upper, and responsive energy return for athletic workouts.")
                    .gender("Unisex")
                    .color("Core Black")
                    .price(12499.0)
                    .discountPrice(11249.0)
                    .stock(35)
                    .category(running)
                    .build();
            p2.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/adidas-ultraboost.jpg").product(p2).build());
            for (String sizeStr : new String[]{"8", "9", "10", "11"}) {
                p2.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(8).product(p2).build());
            }
            productRepository.save(p2);

            // Product 3
            Product p3 = Product.builder()
                    .title("Rugged Classic Boots")
                    .brand("Woodland")
                    .description("Heavy-duty outdoor casual leather boots. Engineered with water-resistant full-grain leather and deep-tread rubber outsoles for superior durability.")
                    .gender("Men")
                    .color("Khaki")
                    .price(5499.0)
                    .discountPrice(4999.0)
                    .stock(40)
                    .category(casual)
                    .build();
            p3.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/woodland-boots.jpg").product(p3).build());
            for (String sizeStr : new String[]{"7", "8", "9", "10"}) {
                p3.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(10).product(p3).build());
            }
            productRepository.save(p3);

            // Product 4
            Product p4 = Product.builder()
                    .title("Classic Black Derby")
                    .brand("Bata")
                    .description("Classic, high-shine formal derby shoes made with premium Italian leather. Complete with double-stitched sole for lasting elegance.")
                    .gender("Men")
                    .color("Stark Black")
                    .price(2499.0)
                    .discountPrice(2199.0)
                    .stock(60)
                    .category(formal)
                    .build();
            p4.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/bata-derby.jpg").product(p4).build());
            for (String sizeStr : new String[]{"6", "7", "8", "9", "10"}) {
                p4.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(12).product(p4).build());
            }
            productRepository.save(p4);

            // Product 5
            Product p5 = Product.builder()
                    .title("Suede Heritage Classic")
                    .brand("Puma")
                    .description("Timeless classic design constructed with plush suede and synthetic overlays. Features the iconic Formstrip design for retro street style.")
                    .gender("Unisex")
                    .color("Saffron Orange")
                    .price(4999.0)
                    .discountPrice(4299.0)
                    .stock(25)
                    .category(sneakers)
                    .build();
            p5.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/puma-suede.jpg").product(p5).build());
            for (String sizeStr : new String[]{"7", "8", "9", "10", "11"}) {
                p5.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(5).product(p5).build());
            }
            productRepository.save(p5);

            // Product 6
            Product p6 = Product.builder()
                    .title("Nano X4 Trainer")
                    .brand("Reebok")
                    .description("Advanced training and cross-fit shoes designed for stability, flexible support, and extreme durability. Features breathable Flexweave woven upper.")
                    .gender("Unisex")
                    .color("Stark White")
                    .price(7999.0)
                    .discountPrice(7299.0)
                    .stock(30)
                    .category(running)
                    .build();
            p6.getProductImages().add(ProductImage.builder().imageUrl("/images/shoes/reebok-nano.jpg").product(p6).build());
            for (String sizeStr : new String[]{"8", "9", "10"}) {
                p6.getProductSizes().add(ProductSize.builder().size(sizeStr).quantity(10).product(p6).build());
            }
            productRepository.save(p6);

            System.out.println("Database Seeding: Shoe products seeded successfully!");
        }
    }
}
