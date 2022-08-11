package com.navigation.business.concretes;

import com.navigation.business.abstracts.RouteService;
import com.navigation.entity.concretes.Route;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;
import com.navigation.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

//    @Override
//    public List<RouteDto> findByUser_Id(Long id) {
//        return this.routeRepository.findByUser_Id(id);
//    }

    @Override
    public MapDataDto getMapDataByRouteId(Long routeId) {
        return this.routeRepository.getMapDataByRouteId(routeId);
    }
}
