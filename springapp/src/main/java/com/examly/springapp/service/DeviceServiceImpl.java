package com.examly.springapp.service;

import com.examly.springapp.model.Device;
import com.examly.springapp.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> searchByType(String type) {
        return deviceRepository.findByType(type);
    }

    public List<Device> searchByBrand(String brand) {
        return deviceRepository.findByBrand(brand);
    };

    public List<Device> searchByModel(String model) {
        return deviceRepository.findByModel(model);
    }

    @Override
    public void saveDevice(Device device) {
        deviceRepository.save(device);
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device searchById(Long id) {
        return deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found"));
    }

    @Override
    public void deleteDeviceById(Long id) {
        deviceRepository.deleteById(id);
    }

    @Override
    public Device updatedevice(Long id, Device newDevice) {
        return deviceRepository.findById(id)
                .map(device -> {
                    device.setType(newDevice.getType());
                    device.setBrand(newDevice.getBrand());
                    device.setModel(newDevice.getModel());
                    return deviceRepository.save(device);
                }).orElseThrow(() -> new RuntimeException("Device Not Found"));
    }

}