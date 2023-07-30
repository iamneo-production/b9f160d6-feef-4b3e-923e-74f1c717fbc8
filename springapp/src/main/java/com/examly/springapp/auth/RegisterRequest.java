package com.examly.springapp.auth;

import com.examly.springapp.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
  private String name;
  private String email;
  private String phoneNumber;
  private String password;
  private String address;
  private Role role;
}
