package com.navigation.controller;

import com.navigation.business.abstracts.RouteService;
import com.navigation.entity.concretes.Route;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.JavaScriptUtils;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RouteController {
    private final RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService){
        this.routeService = routeService;
    }

    @PostMapping(value = "/addRoute",consumes = {"application/json"})
    public Route addRoute(@RequestBody Route route){
        return this.routeService.add(route);
    }

    @GetMapping(value = "/getAllRouteByVehicleId")
    List<RouteDto> findRoutesByVehicleId(@RequestParam Long vehicleId){
        return this.routeService.findRoutesByVehicleId(vehicleId);
    }
    @GetMapping(value = "/getAllRouteByVehicleNull")
    List<RouteDto> findRoutesByVehicleNull(){return this.routeService.findRoutesByVehicleNull();}

    @GetMapping(value = "getAllRoutes")
    List<RouteDto> findAllRoutes(){
        return this.routeService.findAllRoutes();
    }

    @GetMapping(value = "/getMapDataByRouteId")
    public MapDataDto getMapDataByRouteId(@RequestParam Long routeId){
        return this.routeService.getMapDataByRouteId(routeId);
    }


}
