package com.navigation.business.concretes;

import com.navigation.business.abstracts.AddressService;
import com.navigation.entity.concretes.Address;
import com.navigation.entity.dtos.AddressDto;
import com.navigation.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressManager implements AddressService {
    private final AddressRepository addressRepository;

    @Autowired
    public AddressManager(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }


    @Override
    public List<Address> findAllByAddressIdIsNotNull() {
        return this.addressRepository.findAllByAddressIdIsNotNull();
    }

    @Override
    public List<Address> findAllByRoute_Vehicle_VehicleId(Long vehicleId) {
        return this.addressRepository.findAllByRoute_Vehicle_VehicleId(vehicleId);
    }

    @Override
    public Address addAddress(Address address) {
        Address newAddress =  this.addressRepository.save(address);
        return newAddress;
    }

    @Override
    public List<Address> addAddressList(List<Address> addressList) {
        for(Address address:addressList){
            address.setAddressId(Long.getLong("0"));
        }
        List<Address> addedAddressList =   this.addressRepository.saveAll(addressList);
        return addedAddressList;
    }

    @Override
    public List<AddressDto> findByRoute_RouteId(Long routeId) {
        return this.addressRepository.findByRoute_RouteIdOrderByOrderNo(routeId);
    }
}
