package com.navigation.business.concretes;

import com.navigation.business.abstracts.WarehouseService;
import com.navigation.entity.concretes.Warehouse;
import com.navigation.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseManager implements WarehouseService {

  private WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseManager(WarehouseRepository warehouseRepository){
        this.warehouseRepository = warehouseRepository;
    }

    @Override
    public Warehouse add(Warehouse warehouse) {
        Warehouse addedWarehouse = this.warehouseRepository.save(warehouse);
        return addedWarehouse;
    }

    @Override
    public List<Warehouse> findAll() {
        return this.warehouseRepository.findAll();
    }
}
