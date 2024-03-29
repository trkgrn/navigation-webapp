package com.navigation.business.concretes;

import com.navigation.business.abstracts.VehicleService;
import com.navigation.entity.concretes.Vehicle;
import com.navigation.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class VehicleManager implements VehicleService {
    private VehicleRepository vehicleRepository;

    @Autowired
   public VehicleManager(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<Vehicle> findAll() {
        return this.vehicleRepository.findAll();
    }

    @Override
    public List<Vehicle> findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        return this.vehicleRepository.findAll(pageable).getContent();
    }

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        Vehicle addedVehicle = this.vehicleRepository.save(vehicle);
        return addedVehicle;
    }

    @Override
    public List<Vehicle> findAllAvailableVehicle(Date startDate, Date endDate) {
        return this.vehicleRepository.findAllAvailableVehicle(startDate,endDate);
    }

    @Override
    public Long countVehicle() {
        return this.vehicleRepository.count();
    }
}
