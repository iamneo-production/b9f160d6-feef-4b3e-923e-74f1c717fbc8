package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Repair;
import com.examly.springapp.service.RepairService;

@CrossOrigin("https://8081-dfcfbfebbacecafcfeacffbbbdffeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/repairs")
public class RepairController {

    @Autowired
    private RepairService repairService;

    @GetMapping
    public List<Repair> getAll() {
        return repairService.getallRepairs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        if (id != null) {
            Optional<Repair> repair = repairService.getRepairById(id);
            if (repair.isPresent()) {
                return ResponseEntity.ok(repair.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid ID");
        }
    }

    @PostMapping
    public String create(@RequestBody Repair repair) {
        repairService.createRepair(repair);
        return "Successful addition";
    }

    @PutMapping("/{id}")
    public String update(@PathVariable Long id, @RequestBody Repair repair) {
        repairService.updateRepair(repair, id);
        return "successful updation";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repairService.deleteRepair(id);
        return "successful deletion";

    }

}