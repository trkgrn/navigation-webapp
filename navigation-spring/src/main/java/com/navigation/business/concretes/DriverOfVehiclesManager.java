package com.navigation.business.concretes;

import com.navigation.business.abstracts.DriverOfVehiclesService;
import com.navigation.entity.concretes.Driver;
import com.navigation.entity.concretes.DriversOfVehicles;
import com.navigation.entity.concretes.Vehicle;
import com.navigation.repository.DriverOfVehiclesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DriverOfVehiclesManager implements DriverOfVehiclesService {
    private DriverOfVehiclesRepository driverOfVehiclesRepository;

    @Autowired
    public DriverOfVehiclesManager(DriverOfVehiclesRepository driverOfVehiclesRepository) {
        this.driverOfVehiclesRepository = driverOfVehiclesRepository;
    }

    @Override
    public List<DriversOfVehicles> findAll() {
        return this.driverOfVehiclesRepository.findAll();
    }

    @Override
    public List<Driver> findAllAvailableDriver(Date startDate, Date endDate) {
        return this.driverOfVehiclesRepository.findAllAvailableDriver(startDate,endDate);
    }

    @Override
    public DriversOfVehicles add(DriversOfVehicles driversOfVehicles) {
        this.driverOfVehiclesRepository.add(driversOfVehicles);
        return driversOfVehicles;
    }

    @Override
    public List<Vehicle> findAllNotAssignmentVehicle(Date startDate, Date endDate,Long typeId) {
        return this.driverOfVehiclesRepository.findAllNotAssignmentVehicle(startDate,endDate,typeId);
    }
}
