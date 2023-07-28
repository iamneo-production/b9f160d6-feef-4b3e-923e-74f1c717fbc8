package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Customer;
import com.examly.springapp.repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Customer> searchByName(String name) {
        return customerRepository.findAllByName(name);
    }

    public Customer searchByPhone(String phone) {
        return customerRepository.findByPhoneNumber(phone);
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee Not Found"));
    }

    @Override
    public String create(Customer customer) {
        customerRepository.save(customer);
        return "Successfully added";
    }

    @Override
    public String update(Customer customer, Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer updateCustomer = optionalCustomer.get();
            String encodedPassword = customer.getPassword().compareToIgnoreCase(updateCustomer.getPassword()) == 0
                    ? customer.getPassword()
                    : passwordEncoder.encode(customer.getPassword());
            // String encodedPassword = passwordEncoder.matches(customer.getPassword(),
            // updateCustomer.getPassword())
            // ? customer.getPassword()
            // : passwordEncoder.encode(customer.getPassword());
            updateCustomer.setName(customer.getName());
            updateCustomer.setEmail(customer.getEmail());
            updateCustomer.setPassword(encodedPassword);
            updateCustomer.setPhoneNumber(customer.getPhoneNumber());
            updateCustomer.setAddress(customer.getAddress());

            customerRepository.save(updateCustomer);
            return "Successful updation";
        } else {
            return "Customer not found";
        }
    }

    @Override
    public String delete(Long id) {
        customerRepository.deleteById(id);
        return "Successful Deletion";
    }
}

