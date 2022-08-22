package com.navigation.repository;

import com.navigation.entity.concretes.Route;
import com.navigation.entity.concretes.Vehicle;
import com.navigation.entity.dtos.MapDataDto;
import com.navigation.entity.dtos.RouteDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination)" +
            " FROM Route r" +
            " where r.vehicle.vehicleId=:vehicleId")
    List<RouteDto> findRoutesByVehicleId(Long vehicleId); // Id'si verilen araca bağlı rotalar

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination)" +
            " FROM Route r" +
            " where r.vehicle is null")
    List<RouteDto> findRoutesByVehicleNull(Pageable pageable); // Araç atanması yapılmamış rotalar

    Long countRouteByVehicleIsNull(); // Araç atanması yapılmamış rotaların sayısı

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination" +
            ",r.vehicle.vehicleId)" +
            " FROM Route r")
    List<RouteDto> findAllRoutes(); // Tüm rotalar

    @Query("select  new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance,r.averageDuration,r.origin,r.destination" +
            ",r.vehicle.vehicleId)" +
            " FROM Route r order by r.routeId")
    List<RouteDto> findAllRoutes(Pageable pageable);


    @Query("SELECT new com.navigation.entity.dtos.RouteDto" +
            "(r.routeId,r.name,r.startDate,r.endDate,r.averageDistance," +
            "r.averageDuration,r.origin,r.destination,r.vehicle.vehicleId)" +
            "FROM DriversOfVehicles dv," + " Driver d, " + " Vehicle v, " + " Route  r, " + " DriverType dt" +
            " WHERE dv.driver.driverId = d.driverId " +
            " AND dv.type.typeId = dt.typeId " +
            " AND dv.vehicle.vehicleId = v.vehicleId " +
            " AND r.vehicle.vehicleId = v.vehicleId " +
            " AND d.user.id =:#{#userId}" +
            " AND ((r.startDate BETWEEN dv.startDate AND dv.endDate)" +
            " OR (r.endDate BETWEEN dv.startDate AND dv.endDate))" +
            " ORDER BY r.startDate")
    List<RouteDto> findTasksByUserId(Long userId,Pageable pageable);

    @Query("SELECT count(r.routeId) "+
            " FROM DriversOfVehicles dv," + " Driver d, " + " Vehicle v, " + " Route  r, " + " DriverType dt" +
            " WHERE dv.driver.driverId = d.driverId " +
            " AND dv.type.typeId = dt.typeId " +
            " AND dv.vehicle.vehicleId = v.vehicleId " +
            " AND r.vehicle.vehicleId = v.vehicleId " +
            " AND d.user.id =:#{#userId}" +
            " AND ((r.startDate BETWEEN dv.startDate AND dv.endDate)" +
            " OR (r.endDate BETWEEN dv.startDate AND dv.endDate))")
    Long countTasksByUserId(Long userId);


    @Query("select new com.navigation.entity.dtos.MapDataDto(r.mapData)" +
            " FROM Route r " +
            "where r.routeId=:routeId")
    MapDataDto getMapDataByRouteId(Long routeId);


}
