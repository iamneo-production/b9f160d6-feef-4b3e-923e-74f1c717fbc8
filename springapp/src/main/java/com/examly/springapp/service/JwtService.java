package com.examly.springapp.service;

import java.util.*;
import java.util.function.Function;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.Employee;
import com.examly.springapp.model.Customer;

public interface JwtService {
  public String extractUsername(String token);

  public String generateToken(Customer userDetails, UserDetails userD);

  public String generateTokenEmployee(Employee userDetails, UserDetails userD);

  public <T> T extractClaim(String token, Function<Claims, T> claimResolver);

  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

  public boolean isTokenValid(String token, UserDetails userDetails);
}