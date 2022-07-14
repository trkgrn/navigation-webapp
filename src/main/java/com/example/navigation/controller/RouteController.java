package com.example.navigation.controller;

import com.example.navigation.business.abstracts.RouteService;
import com.example.navigation.entity.concretes.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin(origins = "*")
public class RouteController {

   private final RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService){
        this.routeService = routeService;
    }

    @PostMapping("/addRoute")
    public Route addRoute(@RequestBody Route route){
        return this.routeService.add(route);
    }


}
