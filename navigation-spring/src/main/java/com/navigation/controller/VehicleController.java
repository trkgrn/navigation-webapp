package com.navigation.controller;

import com.navigation.business.abstracts.VehicleService;
import com.navigation.entity.concretes.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class VehicleController {

    private VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping(value = "/getAllVehicle")
    public List<Vehicle> findAll() {
        return this.vehicleService.findAll();
    }

    @GetMapping(value = "/getAllVehicleByPage")
    public List<Vehicle> findAllByPage(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.vehicleService.findAll(pageNo,pageSize);
    }

    @GetMapping(value = "/countVehicle")
    public Long countVehicle(){
        return this.vehicleService.countVehicle();
    }

    @PostMapping(value = "/addVehicle")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return this.vehicleService.addVehicle(vehicle);
    }

    @GetMapping(value = "/getAvailableVehicles")
    List<Vehicle> findAllAvailableVehicle(@RequestParam String startDate, @RequestParam String endDate) throws ParseException {
        DateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = myFormat.parse(startDate);
        Date end = myFormat.parse(endDate);
        return this.vehicleService.findAllAvailableVehicle(start, end);
    } //

}
