package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Repair;

@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {

    @Query("SELECT r.customer.name FROM Repair r WHERE r.customer.id = :customerId")
    String findCustomerNameByCustomerId(@Param("customerId") Long customerId);

    @Query("SELECT d.type FROM Repair r JOIN r.device d WHERE d.id = :deviceId")
    String findDeviceTypeByDeviceId(@Param("deviceId") Long deviceId);

    List<Repair> findByCustomer_Name(String name);

    List<Repair> findByDevice_Type(String type);

    List<Repair> findByStatus(String status);

}