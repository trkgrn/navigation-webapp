package com.navigation.business.concretes;

import com.navigation.business.abstracts.RouteService;
import com.navigation.entity.concretes.Route;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;
import com.navigation.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public List<RouteDto> findAllRoutes() {
        return this.routeRepository.findAllRoutes();
    }

    @Override
    public List<RouteDto> findAllRoutes(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        return this.routeRepository.findAllRoutes(pageable);
    }

    @Override
    public List<RouteDto> findRoutesByVehicleId(Long vehicleId) {
        return this.routeRepository.findRoutesByVehicleId(vehicleId);
    }

    @Override
    public List<RouteDto> findRoutesByVehicleNull(int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        return this.routeRepository.findRoutesByVehicleNull(pageable);
    }


    @Override
    public MapDataDto getMapDataByRouteId(Long routeId) {
        return this.routeRepository.getMapDataByRouteId(routeId);
    }

    @Override
    public Route updateRoute(Route route) {
        Route existingRoute = this.routeRepository.findById(route.getRouteId()).orElse(null);
        existingRoute.setVehicle(route.getVehicle());
        return this.routeRepository.save(existingRoute);
    }

    @Override
    public Long routeCount() {
        return this.routeRepository.count();
    }

    @Override
    public Long countRouteByVehicleIsNull() {
        return this.routeRepository.countRouteByVehicleIsNull();
    }

    @Override
    public List<RouteDto> findTasksByUserId(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        return this.routeRepository.findTasksByUserId(userId,pageable);
    }

    @Override
    public Long countTasksByUserId(Long userId) {
        return this.routeRepository.countTasksByUserId(userId);
    }
}
