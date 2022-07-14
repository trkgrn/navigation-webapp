package com.example.navigation.controller;

import com.example.navigation.business.abstracts.AddressService;
import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.core.utilities.results.Result;
import com.example.navigation.entity.concretes.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AddressController {

   private final AddressService addressService;

    @Autowired
    public AddressController (AddressService addressService){
        this.addressService = addressService;
    }


    @GetMapping("/getAllAddress")
    public DataResult <List<Address>> findAllByAddressIdIsNotNull(){
        return this.addressService.findAllByAddressIdIsNotNull();
    }

    @GetMapping("/getUserRoutes")
    public List<Address> findAllByRoute_User_Id(@RequestParam Long userId){
        return this.addressService.findAllByRoute_User_Id(userId).getData();
    }

    @PostMapping("/addAddress")
    public Address addAddress(@RequestBody Address address){

        return this.addressService.addAddress(address);
    }

    @PostMapping("/addAddressList")
    public Result addAddressList(@RequestBody List<Address> addressList){
        return this.addressService.addAddressList(addressList);
    }

}
