package com.example.navigation.business.concretes;

import com.example.navigation.business.abstracts.RouteService;
import com.example.navigation.dataAccess.abstracts.RouteRepository;
import com.example.navigation.entity.concretes.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RouteManager implements RouteService {
   private final RouteRepository routeRepository;

    @Autowired
    public RouteManager(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    @Override
    public Route add(Route route) {
        Route newRoute = this.routeRepository.save(route);
        return newRoute;
    }
}
