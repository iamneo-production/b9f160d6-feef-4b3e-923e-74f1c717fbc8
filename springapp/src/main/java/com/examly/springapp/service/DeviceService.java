package com.examly.springapp.service;

import com.examly.springapp.model.Device;

import java.util.List;

public interface DeviceService {

    public List<Device> searchByType(String type);

    public List<Device> searchByBrand(String brand);

    public List<Device> searchByModel(String model);

    public void saveDevice(Device device);

    public List<Device> getAllDevices();

    public Device searchById(Long id);

    public Device updatedevice(Long id, Device newDevice);

    public void deleteDeviceById(Long id);

}