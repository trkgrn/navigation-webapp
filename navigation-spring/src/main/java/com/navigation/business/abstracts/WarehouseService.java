package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Warehouse;

import java.util.List;

public interface WarehouseService {
    Warehouse add(Warehouse warehouse);
    List<Warehouse> findAll();
}
