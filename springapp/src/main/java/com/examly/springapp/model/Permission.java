package com.examly.springapp.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
  EMPLOYEE_READ("employee:read"),
  EMPLOYEE_UPDATE("employee:update"),
  EMPLOYEE_CREATE("employee:create"),
  EMPLOYEE_DELETE("employee:delete"),
  ADMIN_READ("admin:read"),
  ADMIN_UPDATE("admin:update"),
  ADMIN_CREATE("admin:create"),
  ADMIN_DELETE("admin:delete");

  @Getter
  private final String permission;
}