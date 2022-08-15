package com.navigation.controller;

import com.navigation.business.abstracts.DriverTypeService;
import com.navigation.entity.concretes.DriverType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DriverTypeController {

    private DriverTypeService driverTypeService;

    @Autowired
    public DriverTypeController(DriverTypeService driverTypeService) {
        this.driverTypeService = driverTypeService;
    }

    @GetMapping(value = "/getAllDriverType")
    List<DriverType> findAll(){
        return this.driverTypeService.findAll();
    }

}
