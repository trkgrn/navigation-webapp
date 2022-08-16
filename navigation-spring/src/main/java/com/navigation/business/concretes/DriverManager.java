package com.navigation.business.concretes;

import com.navigation.business.abstracts.DriverService;
import com.navigation.entity.concretes.Driver;
import com.navigation.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverManager implements DriverService {

    private DriverRepository driverRepository;

    @Autowired
    public DriverManager(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public Driver addDriver(Driver driver) {
        Driver addedDriver = this.driverRepository.save(driver);
        return addedDriver;
    }
}
