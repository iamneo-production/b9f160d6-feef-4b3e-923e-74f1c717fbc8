package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.Employee;

import java.util.*;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findAllById(Long id);

    List<Employee> findAllByName(String name);

    Employee findAllByEmail(String email);

    Employee findAllByphoneNumber(String phNumber);

    Optional<Employee> findByEmail(String email);

}