package com.examly.springapp.repository;


import com.examly.springapp.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    
    
    List<Device> findByType(String type);
    List<Device> findByBrand(String brand);
    List<Device> findByModel(String model);

    
}