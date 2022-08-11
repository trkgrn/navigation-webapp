package com.navigation.repository;

import com.navigation.entity.concretes.Address;
import com.navigation.entity.dtos.AddressDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findAllByAddressIdIsNotNull();
    List <Address> findAllByRoute_Vehicle_VehicleId(Long vehicleId);

    @Query("select new com.navigation.entity.dtos.AddressDto" +
            "(a.addressId,a.orderNo,a.sehir,a.ilce,a.mahalle,a.sokak,a.binaNo,a.daireNo,a.coordinate)"
            +" FROM Address a" +
            " where a.route.routeId=:routeId " +
            "order by a.orderNo")
    List <AddressDto> findByRoute_RouteIdOrderByOrderNo(Long routeId);
}
