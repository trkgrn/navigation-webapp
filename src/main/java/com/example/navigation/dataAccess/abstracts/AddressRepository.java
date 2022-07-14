package com.example.navigation.dataAccess.abstracts;

import com.example.navigation.entity.concretes.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AddressRepository extends JpaRepository<Address,Long> {

  //  List<Address> findByRoute_Route_id(int route_id);
      List <Address> findAllByAddressIdIsNotNull();
      List <Address> findAllByRoute_User_Id(Long userId);
}
