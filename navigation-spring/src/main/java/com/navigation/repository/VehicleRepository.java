package com.navigation.repository;

import com.navigation.entity.concretes.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
    @Override
    List<Vehicle> findAll();

    @Query("FROM  Vehicle v " +
            "WHERE v.vehicleId NOT IN " +
                                 "(SELECT r.vehicle.vehicleId\n" +
                                     "FROM Route r " +
                                     "WHERE r.vehicle.vehicleId is not null " +
                                     "AND r.startDate BETWEEN :startDate AND :endDate " +
                                     "AND r.endDate BETWEEN :startDate AND :endDate)")
    List<Vehicle> findAllAvailableVehicle(Date startDate, Date endDate);
}
