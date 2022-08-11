package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Address;
import com.navigation.entity.dtos.AddressDto;

import java.util.List;

public interface AddressService {
    List<Address>  findAllByAddressIdIsNotNull();
    List<Address>  findAllByRoute_Vehicle_VehicleId(Long vehicleId);
    Address addAddress(Address address);
    List<Address>  addAddressList(List<Address> addressList);
    List <AddressDto> findByRoute_RouteId(Long routeId);
}
