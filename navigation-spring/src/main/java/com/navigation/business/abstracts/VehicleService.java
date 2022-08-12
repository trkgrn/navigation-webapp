package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Vehicle;

import java.util.List;

public interface VehicleService {
    List<Vehicle> findAll();
    Vehicle addVehicle(Vehicle vehicle);
}
