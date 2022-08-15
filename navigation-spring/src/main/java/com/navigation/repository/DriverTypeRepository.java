package com.navigation.repository;

import com.navigation.entity.concretes.DriverType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverTypeRepository extends JpaRepository<DriverType,Long> {
}
