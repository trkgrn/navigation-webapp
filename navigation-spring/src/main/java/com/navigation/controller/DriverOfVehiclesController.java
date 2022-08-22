package com.navigation.controller;

import com.navigation.business.abstracts.DriverOfVehiclesService;
import com.navigation.entity.concretes.Driver;
import com.navigation.entity.concretes.DriversOfVehicles;
import com.navigation.entity.concretes.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DriverOfVehiclesController {

    private DriverOfVehiclesService driverOfVehiclesService;

    @Autowired
    public DriverOfVehiclesController(DriverOfVehiclesService driverOfVehiclesService) {
        this.driverOfVehiclesService = driverOfVehiclesService;
    }

    @GetMapping(value = "/getCrossTable")
   public List<DriversOfVehicles> findAll(){
        return this.driverOfVehiclesService.findAll();
    }

    @GetMapping(value = "/getAvailableDrivers")
    List<Driver> findAllAvailableVehicle(@RequestParam String startDate, @RequestParam String endDate) throws ParseException {
        DateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = myFormat.parse(startDate);
        Date end = myFormat.parse(endDate);
        return this.driverOfVehiclesService.findAllAvailableDriver(start,end);
    }
    @GetMapping(value = "/findAllNotAssignmentVehicle")
    List<Vehicle> findAllNotAssignmentVehicle(@RequestParam String startDate, @RequestParam String endDate, @RequestParam Long typeId)throws ParseException {
        DateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = myFormat.parse(startDate);
        Date end = myFormat.parse(endDate);
        return this.driverOfVehiclesService.findAllNotAssignmentVehicle(start,end,typeId);
    }

    @PostMapping(value = "/addDriverOfVehicle")
    public DriversOfVehicles add(@RequestBody DriversOfVehicles driversOfVehicles){
        this.driverOfVehiclesService.add(driversOfVehicles);
        return driversOfVehicles;
    }

    @GetMapping(value = "/findDriversOfVehiclesByUserId")
   public List<DriversOfVehicles> findDriversOfVehiclesByDriver_User_IdOrderByStartDate(@RequestParam Long userId){
        List<DriversOfVehicles> response = this.driverOfVehiclesService.findDriversOfVehiclesByDriver_User_IdOrderByStartDate(userId);
        for (DriversOfVehicles next:response) {
            next.getDriver().getUser().setPassword("");
        }
        return response;
    }
}
