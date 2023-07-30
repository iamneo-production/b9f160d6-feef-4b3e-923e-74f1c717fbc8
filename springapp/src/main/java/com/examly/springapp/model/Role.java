package com.examly.springapp.model;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@RequiredArgsConstructor
public enum Role {
  CUSTOMER(Collections.emptySet()),
  ADMIN(
      Set.of(
          Permission.ADMIN_READ,
          Permission.ADMIN_UPDATE,
          Permission.ADMIN_DELETE,
          Permission.ADMIN_CREATE,
          Permission.EMPLOYEE_READ,
          Permission.EMPLOYEE_UPDATE,
          Permission.EMPLOYEE_DELETE,
          Permission.EMPLOYEE_CREATE)),
  EMPLOYEE(
      Set.of(
          Permission.EMPLOYEE_READ,
          Permission.EMPLOYEE_UPDATE,
          Permission.EMPLOYEE_DELETE,
          Permission.EMPLOYEE_CREATE));

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
        .stream()
        .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
        .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}