package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Vehicle;

import java.util.Date;
import java.util.List;

public interface VehicleService {
    List<Vehicle> findAll();
    List<Vehicle> findAll(int pageNo,int pageSize);
    Vehicle addVehicle(Vehicle vehicle);
    List<Vehicle> findAllAvailableVehicle(Date startDate, Date endDate);
    Long countVehicle();
}
