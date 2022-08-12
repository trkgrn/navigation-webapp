package com.navigation.repository;

import com.navigation.entity.concretes.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
    @Override
    List<Vehicle> findAll();
}
