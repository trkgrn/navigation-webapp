package com.navigation.controller;

import com.navigation.business.abstracts.VehicleService;
import com.navigation.entity.concretes.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class VehicleController {

    private VehicleService vehicleService;

    @Autowired
   public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }

    @GetMapping(value = "/getAllVehicle")
   public List<Vehicle> findAll(){
        return this.vehicleService.findAll();
    }

    @PostMapping(value = "/addVehicle")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle){
        return this.vehicleService.addVehicle(vehicle);
    }

}
