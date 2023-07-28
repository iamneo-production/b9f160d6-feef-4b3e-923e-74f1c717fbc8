package com.examly.springapp.controller;

import com.examly.springapp.model.Device;
import com.examly.springapp.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/devices")
@CrossOrigin
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping
    public ResponseEntity<String> addDevice(@RequestBody Device device) {
        try {
            deviceService.saveDevice(device);
            return ResponseEntity.ok("Device added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add the device: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> findByID(@PathVariable Long id) {
        Device device = deviceService.searchById(id);
        if (device == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(device);
        }
    }

    @PutMapping("/{id}")
    public String updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
        if (id != null) {
            deviceService.updatedevice(id, updatedDevice);
            return "Device with id " + id + " updated";
        } else {
            return "Device with id " + id + " not found";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteEmployeeById(@PathVariable Long id) {
        if (id != null) {
            Device device = deviceService.searchById(id);
            if (device == null) {
                return "device with id " + id + " Not Found";
            } else {
                deviceService.deleteDeviceById(id);
                return "Employee with id " + id + " is deleted";
            }
        }
        return null;
    }

}

