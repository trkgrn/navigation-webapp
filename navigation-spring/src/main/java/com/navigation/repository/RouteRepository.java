package com.navigation.repository;

import com.navigation.entity.concretes.Route;
import com.navigation.entity.concretes.Vehicle;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route,Long> {

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
    "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination)" +
    " FROM Route r" +
    " where r.vehicle.vehicleId=:vehicleId")
    List<RouteDto> findRoutesByVehicleId(Long vehicleId); // Id'si verilen araca bağlı rotalar

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination)" +
            " FROM Route r" +
            " where r.vehicle is null")
    List<RouteDto> findRoutesByVehicleNull(); // Araç atanması yapılmamış rotalar

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination" +
            ",r.vehicle.vehicleId)" +
            " FROM Route r")
    List<RouteDto> findAllRoutes(); // Tüm rotalar

    @Query("select new com.navigation.entity.dtos.MapDataDto(r.mapData)" +
            " FROM Route r " +
            "where r.routeId=:routeId")
    MapDataDto getMapDataByRouteId(Long routeId);



}
