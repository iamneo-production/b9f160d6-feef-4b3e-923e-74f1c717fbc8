package com.examly.springapp.service;

import com.examly.springapp.model.Customer;

import java.util.List;

public interface CustomerService {

    public List<Customer> searchByName(String name);

    public Customer searchByPhone(String phone);

    public List<Customer> findAll();

    public Customer findById(Long id);

    public String create(Customer customer);

    public String update(Customer customer, Long id);

    public String delete(Long id);
}

