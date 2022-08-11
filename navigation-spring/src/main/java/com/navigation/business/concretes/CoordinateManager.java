package com.navigation.business.concretes;

import com.navigation.business.abstracts.CoordinateService;
import com.navigation.entity.concretes.Coordinate;
import com.navigation.repository.CoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoordinateManager implements CoordinateService {

    @Autowired
   private CoordinateRepository coordinateRepository;

    @Override
    public Coordinate add(Coordinate coordinate) {
        Coordinate newCoordinate = coordinateRepository.save(coordinate);
        return newCoordinate;
    }
}
