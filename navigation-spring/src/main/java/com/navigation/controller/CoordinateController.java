package com.navigation.controller;

import com.navigation.business.abstracts.CoordinateService;
import com.navigation.entity.concretes.Coordinate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class CoordinateController {

    @Autowired
    private CoordinateService coordinateService;

    @PostMapping(value = "/addCoordinate")
    public Coordinate add(@RequestBody Coordinate coordinate){
        return this.coordinateService.add(coordinate);
    }
}
