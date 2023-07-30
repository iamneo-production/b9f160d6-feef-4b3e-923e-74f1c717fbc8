package com.examly.springapp.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/users")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.register(request));
  };

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> autheticate(@RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  };

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> registerEmployee(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.registerEmployee(request));
  };

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> autheticateEmployee(@RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.autheticateEmployee(request));
  };

}
