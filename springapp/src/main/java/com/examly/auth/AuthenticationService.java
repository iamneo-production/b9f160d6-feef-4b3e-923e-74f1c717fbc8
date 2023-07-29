package com.examly.springapp.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Employee;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.Customer;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.CustomerRepository;
import com.examly.springapp.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final CustomerRepository customerRepository;
  private final EmployeeRepository employeeRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse register(RegisterRequest request) {

    var customer = Customer
        .builder()
        .name(request.getName())
        .email(request.getEmail())
        .phoneNumber(request.getPhoneNumber())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.CUSTOMER)
        .address(request.getAddress())
        .build();

    customerRepository.save(customer);

    var jwtToken = jwtService.generateToken(customer, customer);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.getEmail(),
              request.getPassword()));
    } catch (AuthenticationException e) {
      throw new BadCredentialsException("Invalid email or password");
    }

    var user = customerRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("Email not found"));

    var jwtToken = jwtService.generateToken(user, user);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse registerEmployee(RegisterRequest request) {

    var user = Employee
        .builder()
        .name(request.getName())
        .email(request.getEmail())
        .phoneNumber(request.getPhoneNumber())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.EMPLOYEE)
        .build();

    employeeRepository.save(user);

    var jwtToken = jwtService.generateTokenEmployee(user, user);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse autheticateEmployee(AuthenticationRequest request) {

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.getEmail(),
              request.getPassword()));
    } catch (AuthenticationException e) {
      throw new BadCredentialsException("Invalid email or password");
    }

    var employee = employeeRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("Email not found"));

    var jwtToken = jwtService.generateTokenEmployee(employee, employee);

    return AuthenticationResponse
        .builder()
        .token(jwtToken)
        .build();
  }
}
