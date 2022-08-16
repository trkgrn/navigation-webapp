package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Driver;
import com.navigation.entity.concretes.DriversOfVehicles;
import com.navigation.entity.concretes.Vehicle;

import java.util.Date;
import java.util.List;

public interface DriverOfVehiclesService {
   List<DriversOfVehicles> findAll();
   List<Driver> findAllAvailableDriver(Date startDate, Date endDate);
   DriversOfVehicles add(DriversOfVehicles driversOfVehicles);
   List<Vehicle> findAllNotAssignmentVehicle(Date startDate, Date endDate,Long typeId);
}
