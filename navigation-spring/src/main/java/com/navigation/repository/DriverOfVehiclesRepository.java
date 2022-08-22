package com.navigation.repository;

import com.navigation.entity.concretes.Driver;
import com.navigation.entity.concretes.DriversOfVehicles;
import com.navigation.entity.concretes.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface DriverOfVehiclesRepository extends JpaRepository<DriversOfVehicles, Long> {
    @Override
    List<DriversOfVehicles> findAll();

    @Query("FROM  Driver d " +
            "WHERE d.driverId NOT IN " +
            "(SELECT dv.driver.driverId\n" +
            "FROM DriversOfVehicles dv " +
            "WHERE dv.driver.driverId is not null " +
            "AND ( (dv.startDate BETWEEN :startDate AND :endDate) " +
            "OR (dv.endDate BETWEEN :startDate AND :endDate)) )")
    List<Driver> findAllAvailableDriver(Date startDate, Date endDate);

    @Query("FROM  Vehicle v " +
            "WHERE v.vehicleId NOT IN " +
            "(SELECT dv.vehicle.vehicleId " +
            "FROM DriversOfVehicles dv " +
            "WHERE dv.type.typeId =:typeId  " +
            "AND ( (dv.startDate BETWEEN :startDate AND :endDate) " +
            "OR (dv.endDate BETWEEN :startDate AND :endDate)) )")
    List<Vehicle> findAllNotAssignmentVehicle(Date startDate, Date endDate, Long typeId);

    List<DriversOfVehicles> findDriversOfVehiclesByDriver_User_IdOrderByStartDate(Long userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true,
            value = "INSERT INTO drivers_of_vehicles (" +
                    " driver_type_id, start_date, end_date, vehicle_id, driver_id)" +
                    " VALUES (:#{#d.type.typeId}, :#{#d.startDate}, :#{#d.endDate}, :#{#d.vehicle.vehicleId}, :#{#d.driver.driverId})")
    void add(DriversOfVehicles d);
}
