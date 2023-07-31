package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.model.Customer;
import com.examly.springapp.service.CustomerService;

@CrossOrigin("https://8081-dfcfbfebbacecafcfeacffbbbdffeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAll() {
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(@PathVariable Long id) {
        try {
            Customer customer = customerService.findById(id);
            if (customer == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public String create(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @PutMapping("/{id}")
    public String update(@PathVariable Long id, @RequestBody Customer customer) {
        Customer existingCustomer = customerService.findById(id);
        if (existingCustomer == null) {
            return "No such user exists";
        } else {
            return customerService.update(customer, id);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        Customer existingCustomer = customerService.findById(id);
        if (existingCustomer == null) {
            return "No such user exists";
        }
        return customerService.delete(id);
    }
}

