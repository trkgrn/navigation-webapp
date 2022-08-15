package com.navigation.business.concretes;

import com.navigation.business.abstracts.DriverTypeService;
import com.navigation.entity.concretes.DriverType;
import com.navigation.repository.DriverTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverTypeManager implements DriverTypeService {

    private DriverTypeRepository driverTypeRepository;

    @Autowired
    public DriverTypeManager(DriverTypeRepository driverTypeRepository){
        this.driverTypeRepository = driverTypeRepository;
    }

    @Override
    public List<DriverType> findAll() {
        return this.driverTypeRepository.findAll();
    }
}
