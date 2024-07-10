package com.project.demo.rest.product;

import com.project.demo.logic.entity.product.Product;
import com.project.demo.logic.entity.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Product")
public class ProductRestController {
    @Autowired
    private ProductRepository ProductRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Product> getAllProduct() {
        return ProductRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public Product addProduct(@RequestBody Product product) {
        return ProductRepository.save(product);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return ProductRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/filterByName/{name}")
    public List<Product> getProductById(@PathVariable String name) {
        return ProductRepository.findProductWithCharacterInName(name);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ProductRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(product.getName());
                    existingProduct.setDescription(product.getDescription());
                    existingProduct.setPrice(product.getPrice());
                    existingProduct.setStock(product.getStock());
                    return ProductRepository.save(existingProduct);
                })
                .orElseGet(() -> {
                    product.setId(id);
                    return ProductRepository.save(product);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        ProductRepository.deleteById(id);
    }


}
