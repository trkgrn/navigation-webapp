package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Route;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;

import java.util.List;

public interface RouteService {
    Route add(Route route);
    List<RouteDto> findAllRoutes();
    List<RouteDto> findRoutesByVehicleId(Long vehicleId);
    List<RouteDto> findRoutesByVehicleNull();
    MapDataDto getMapDataByRouteId(Long routeId);
    Route updateRoute(Route route);

}
