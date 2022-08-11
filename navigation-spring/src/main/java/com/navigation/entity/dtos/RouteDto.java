package com.navigation.entity.dtos;

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
    private Date routeDate;
    private Long averageDistance;
    private Long averageDuration;
    private Warehouse origin;
    private Warehouse destination;
}
