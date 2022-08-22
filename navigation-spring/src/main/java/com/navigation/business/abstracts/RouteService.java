package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Route;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;

import java.util.List;

public interface RouteService {
    Route add(Route route);
    List<RouteDto> findAllRoutes();
    List<RouteDto> findAllRoutes(int pageNo, int pageSize);
    List<RouteDto> findRoutesByVehicleId(Long vehicleId);
    List<RouteDto> findRoutesByVehicleNull(int pageNo, int pageSize);
    MapDataDto getMapDataByRouteId(Long routeId);
    Route updateRoute(Route route);
    Long routeCount();
    Long countRouteByVehicleIsNull();
    List<RouteDto> findTasksByUserId(Long userId,int pageNo, int pageSize);
    Long countTasksByUserId(Long userId);

}
