package com.examly.springapp.config;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.model.Customer;
import com.examly.springapp.model.Employee;
import com.examly.springapp.repository.CustomerRepository;
import com.examly.springapp.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

  private final CustomerRepository customerRepository;
  private final EmployeeRepository employeeRepository;

  @Bean
  public UserDetailsService userDetailsService() {
    return email -> {
      Optional<Customer> customer = customerRepository.findByEmail(email);
      if (customer.isPresent()) {
        return customer.get();
      } else {
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        return employee.orElseThrow(() -> new UsernameNotFoundException("User not found"));
      }
    };
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}