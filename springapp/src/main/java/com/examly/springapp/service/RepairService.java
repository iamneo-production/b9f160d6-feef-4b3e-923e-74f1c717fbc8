package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Repair;

public interface RepairService {

    String getCustomerName(Long customerId);

    String getDeviceType(Long deviceId);

    List<Repair> searchByCustomerName(String name);

    List<Repair> searchByDeviceType(String type);

    public List<Repair> searchByStatus(String status);

    public List<Repair> getallRepairs();

    public Optional<Repair> getRepairById(Long id);

    public String createRepair(Repair repair);

    public String updateRepair(Repair repair, Long id);

    public String deleteRepair(Long id);

}