package com.navigation.business.abstracts;

import com.navigation.entity.concretes.DriverType;

import java.util.List;

public interface DriverTypeService {
   List<DriverType> findAll();
}
