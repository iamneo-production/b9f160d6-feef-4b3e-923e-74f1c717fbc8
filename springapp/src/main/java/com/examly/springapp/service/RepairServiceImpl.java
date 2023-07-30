package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Device;
import com.examly.springapp.model.Repair;
import com.examly.springapp.repository.RepairRepository;

@Service
public class RepairServiceImpl implements RepairService {

    @Autowired
    private RepairRepository repairRepository;

    @Override
    public String getCustomerName(Long customerId) {
        Optional<Repair> optionalRepair = repairRepository.findById(customerId);
        return optionalRepair.map(repair -> repair.getCustomer().getName()).orElse(null);
    }

    @Override
    public String getDeviceType(Long deviceId) {
        Optional<Repair> optionalRepair = repairRepository.findById(deviceId);
        return optionalRepair.map(repair -> {
            Device devices = repair.getDevice();
            if (devices != null) {
                return devices.getType();
            }
            return null;
        }).orElse(null);
    }

    @Override
    public List<Repair> searchByCustomerName(String name) {

        return repairRepository.findByCustomer_Name(name);
    }

    @Override
    public List<Repair> searchByDeviceType(String type) {

        return repairRepository.findByDevice_Type(type);
    }

    @Override
    public List<Repair> searchByStatus(String status) {

        return repairRepository.findByStatus(status);
    }

    @Override
    public String createRepair(Repair repair) {
        Repair createdRepair = repairRepository.save(repair);
        if (createdRepair != null) {
            return "Successful addition";
        } else {
            return "Failed to create";
        }
    }

    

    @Override
    public String deleteRepair(Long id) {
        Optional<Repair> optionalRepair = repairRepository.findById(id);
        if (optionalRepair.isPresent()) {
            repairRepository.deleteById(id);
            return "Successful deletion";
        } else {
            return "No repair found with the ID " + id;
        }
    }

    @Override
    public Optional<Repair> getRepairById(Long id) {
        return repairRepository.findById(id);
    }

    @Override
    public List<Repair> getallRepairs() {
        return repairRepository.findAll();
    }

    @Override
    public String updateRepair(Repair repair, Long id) {
        Optional<Repair> optionalRepair = repairRepository.findById(id);
        if (optionalRepair.isPresent()) {
            Repair existingRepair = optionalRepair.get();
            existingRepair.setCustomer(repair.getCustomer());
            existingRepair.setDevice(repair.getDevice());
            existingRepair.setEmployee(repair.getEmployee());
            existingRepair.setDescription(repair.getDescription());
            existingRepair.setStatus(repair.getStatus());
            existingRepair.setDate(repair.getDate());
            repairRepository.save(existingRepair);
            return "Successfully updated repair with ID " + id;
        } else {
            return "No repair found with the ID " + id;
        }
    }

}