package com.examly.springapp.controller;

import com.examly.springapp.model.Employee;
import com.examly.springapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("https://8081-feabdebaacadddcfeacffbbbdffeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public boolean addEmployee(@RequestBody Employee employee) {
        Employee e = employeeService.searchById(employee.getId());
        if (e == null) {
            employeeService.saveEmployee(employee);
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.searchById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployee();
    }

    @PutMapping("/{id}")
    public String updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Employee existingEmployee = employeeService.searchById(id);
        if (existingEmployee == null) {
            return "No such user exists";
        } else {
            employeeService.updateEmployee(id, updatedEmployee);
            return "Updated";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteEmployeeById(@PathVariable Long id) {
        if (id != null) {
            Employee employees = employeeService.searchById(id);
            if (employees == null) {
                return "Employee with id : " + id + " Not Found";
            } else {
                employeeService.deleteEmployeeById(id);
                return "Employee with id :" + id + " is deleted";
            }
        }
        return null;
    }
}