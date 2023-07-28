package com.examly.springapp.service;

import com.examly.springapp.model.Employee;
import com.examly.springapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Employee searchById(Long id) {
        Employee employees = employeeRepository.findAllById(id);
        return employees;
    }

    @Override
    public List<Employee> searchByname(String name) {
        List<Employee> employees = employeeRepository.findAllByName(name);
        return employees;
    }

    @Override
    public Employee searchByEmail(String email) {
        Employee employees = employeeRepository.findAllByEmail(email);
        return employees;
    }

    @Override
    public Employee searchByphoneNumber(String phNumber) {
        Employee employees = employeeRepository.findAllByphoneNumber(phNumber);
        return employees;
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public void saveEmployee(Employee employee) {
        String email = employee.getEmail();
        Employee e = employeeRepository.findAllByEmail(email);
        if (e == null) {
            employeeRepository.save(employee);
        } else {
            throw new IllegalArgumentException("Id already exists");
        }
    }

    @Override
    public Employee updateEmployee(Long id, Employee newEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee updateEmployee = optionalEmployee.get();
            String encodedPassword = newEmployee.getPassword().compareToIgnoreCase(updateEmployee.getPassword()) == 0
                    ? newEmployee.getPassword()
                    : passwordEncoder.encode(newEmployee.getPassword());

            updateEmployee.setName(newEmployee.getName());
            updateEmployee.setEmail(newEmployee.getEmail());
            updateEmployee.setPassword(encodedPassword);
            updateEmployee.setPhoneNumber(newEmployee.getPhoneNumber());
            updateEmployee.setRole(newEmployee.getRole());
            employeeRepository.save(updateEmployee);
            return updateEmployee;
        } else {
            throw new NoSuchElementException("Employee not found");
        }
    }

    @Override
    public void deleteEmployeeById(Long id) {
        employeeRepository.deleteById(id);
    }
}