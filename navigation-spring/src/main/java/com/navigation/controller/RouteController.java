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

//    @GetMapping(value = "/getAllRouteByUserId")
//    public List<RouteDto> findByUser_Id(@RequestParam Long id){
//        return this.routeService.findByUser_Id(id);
//    }

    @GetMapping(value = "/getMapDataByRouteId")
    public MapDataDto getMapDataByRouteId(@RequestParam Long routeId){
        return this.routeService.getMapDataByRouteId(routeId);
    }

}
