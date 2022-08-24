package com.navigation.entity.dtos;

import com.navigation.entity.concretes.DriverType;
import com.navigation.entity.concretes.Vehicle;
import com.navigation.entity.concretes.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDto {
    private Long routeId;
    private String name;
    private Date startDate;
    private Date endDate;
    private Long averageDistance;
    private Long averageDuration;
    private Warehouse origin;
    private Warehouse destination;
    private Long vehicleId;
    private Vehicle vehicle;
    private DriverType driverType;

    public RouteDto(Long routeId, String name, Date startDate, Date endDate, Long averageDistance, Long averageDuration, Warehouse origin, Warehouse destination) {
        this.routeId = routeId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.averageDistance = averageDistance;
        this.averageDuration = averageDuration;
        this.origin = origin;
        this.destination = destination;
    }

    public RouteDto(Long routeId, String name, Date startDate, Date endDate, Long averageDistance, Long averageDuration, Warehouse origin, Warehouse destination, Long vehicleId) {
        this.routeId = routeId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.averageDistance = averageDistance;
        this.averageDuration = averageDuration;
        this.origin = origin;
        this.destination = destination;
        this.vehicleId = vehicleId;
    }

    public RouteDto(Long routeId, String name, Date startDate, Date endDate, Long averageDistance, Long averageDuration, Warehouse origin, Warehouse destination, Vehicle vehicle) {
        this.routeId = routeId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.averageDistance = averageDistance;
        this.averageDuration = averageDuration;
        this.origin = origin;
        this.destination = destination;
        this.vehicle = vehicle;
    }
}
