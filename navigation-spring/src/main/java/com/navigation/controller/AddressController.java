package com.navigation.controller;

import com.navigation.business.abstracts.AddressService;
import com.navigation.entity.concretes.Address;
import com.navigation.entity.dtos.AddressDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AddressController {
    private  final AddressService addressService;

    @Autowired
    public AddressController (AddressService addressService){
        this.addressService = addressService;
    }

    @GetMapping("/getAllAddress")
    public  List<Address> findAllByAddressIdIsNotNull(){
        return this.addressService.findAllByAddressIdIsNotNull();
    }

    @GetMapping("/getVehicleRoutes")
    public List<Address> findAllByRoute_Vehicle_VehicleId(@RequestParam Long vehicleId){
        return this.addressService.findAllByRoute_Vehicle_VehicleId(vehicleId);
    }

    @PostMapping("/addAddress")
    public Address addAddress(@RequestBody Address address){
        return this.addressService.addAddress(address);
    }

    @PostMapping("/addAddressList")
    public List<Address> addAddressList(@RequestBody List<Address> addressList){
        return this.addressService.addAddressList(addressList);
    }

    @GetMapping("/getAddressByRouteId")
   public List <AddressDto> findByRoute_RouteId(@RequestParam Long routeId){
        return this.addressService.findByRoute_RouteId(routeId);
    }
}
