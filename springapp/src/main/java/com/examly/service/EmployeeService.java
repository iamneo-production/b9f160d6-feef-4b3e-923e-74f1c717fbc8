package com.examly.springapp.service;
import com.examly.springapp.model.Employee;

import java.util.*;

public interface EmployeeService {

    public List<Employee> searchByname(String name);

    public Employee searchByEmail(String Email);

    public Employee searchByphoneNumber(String phNumber);

    public Employee searchById(Long id);

    public List<Employee> getAllEmployee();

    public void saveEmployee(Employee employee);

    public Employee updateEmployee(Long id, Employee newEmployee);

    public void deleteEmployeeById(Long id);
}