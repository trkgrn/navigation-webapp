package com.example.navigation.business.concretes;

import com.example.navigation.business.abstracts.AddressService;
import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.core.utilities.results.Result;
import com.example.navigation.core.utilities.results.SuccessDataResult;
import com.example.navigation.core.utilities.results.SuccessResult;
import com.example.navigation.dataAccess.abstracts.AddressRepository;
import com.example.navigation.entity.concretes.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class AddressManager implements AddressService {

   private final AddressRepository addressRepository;

   @Autowired
   public AddressManager(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }

    @Override
    public DataResult<List<Address>> findAllByAddressIdIsNotNull() {
        return new SuccessDataResult<List<Address>>(this.addressRepository.findAllByAddressIdIsNotNull(),"Başarılı");
    }

    @Override
    public DataResult<List<Address>> findAllByRoute_User_Id(Long userId) {
        return new SuccessDataResult<List<Address>>(this.addressRepository.findAllByRoute_User_Id(userId),"Tüm rotalar getirildi!");
    }

    @Override
    public Address addAddress(Address address) {
     Address newAddress =  this.addressRepository.save(address);

        return newAddress;
    }

    @Override
    public Result addAddressList(List<Address> addressList) {
       for(Address address:addressList){
           address.setAddressId(Long.getLong("0"));
       }
       this.addressRepository.saveAll(addressList);
        return new SuccessResult("Adresler eklendi");
    }


//    @Override
//    public DataResult<Address> findByRoute_Route_id(int route_id) {
//        return null;
//    }
}
