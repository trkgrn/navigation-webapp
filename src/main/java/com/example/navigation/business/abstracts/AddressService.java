package com.example.navigation.business.abstracts;

import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.core.utilities.results.Result;
import com.example.navigation.entity.concretes.Address;

import java.util.List;


public interface AddressService {
 //   DataResult<List<Address>> findByRoute_Route_id(int route_id);
    DataResult<List<Address>>  findAllByAddressIdIsNotNull();
    DataResult<List <Address>> findAllByRoute_User_Id(Long userId);
    Address addAddress(Address address);
    Result addAddressList(List<Address> addressList);
}
