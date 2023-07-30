package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.Role;
import com.examly.springapp.repository.EmployeeRepository;

@Component
public class InitialDataLoader implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public InitialDataLoader(PasswordEncoder passwordEncoder, EmployeeRepository employeeRepository) {
        this.passwordEncoder = passwordEncoder;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the repository is empty
        if (employeeRepository.count() == 0) {
            Employee admin = new Employee();
            admin.setName("Admin");
            admin.setEmail("team21@gmail.com");
            admin.setRole(Role.ADMIN);
            admin.setPhoneNumber("9874563210");
            admin.setPassword(passwordEncoder.encode("1234"));
            employeeRepository.save(admin);
        }
    }
}
