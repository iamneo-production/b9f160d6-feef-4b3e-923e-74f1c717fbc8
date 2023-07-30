package com.examly.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import javax.persistence.OneToOne;

import java.time.LocalDate;

@Entity
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = Customer.class)
    private Customer customer;

    @ManyToOne(targetEntity = Device.class)
    private Device device;

    @ManyToOne(targetEntity = Employee.class)
    private Employee employee;

    private String description;
    private String status;
    private LocalDate date;

    public Repair() {
    }

    public Repair(Customer customer, Device device, Employee employee, String description, String status,
            LocalDate date) {
        this.customer = customer;
        this.device = device;
        this.employee = employee;
        this.description = description;
        this.status = status;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCustomerName() {
        return customer != null ? customer.getName() : null;
    }

    public String getCustomerEmail() {
        return customer != null ? customer.getEmail() : null;
    }

    public String getEmployeeEmail() {
        return employee != null ? employee.getEmail() : null;
    }
}
