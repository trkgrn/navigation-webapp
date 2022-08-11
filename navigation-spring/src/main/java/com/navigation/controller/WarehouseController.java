package com.navigation.controller;

import com.navigation.business.abstracts.WarehouseService;
import com.navigation.entity.concretes.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WarehouseController {

    private WarehouseService warehouseService;

    @Autowired
    public WarehouseController(WarehouseService warehouseService){
        this.warehouseService = warehouseService;
    }

    @PostMapping("/addWarehouse")
    public Warehouse add(@RequestBody Warehouse warehouse){
        return this.warehouseService.add(warehouse);
    }

    @GetMapping("/getAllWarehouse")
    public List<Warehouse> findAll(){
        return this.warehouseService.findAll();
    }

}
