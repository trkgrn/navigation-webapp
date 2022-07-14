package com.example.navigation.dataAccess.abstracts;

import com.example.navigation.entity.concretes.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route,Long> {


}
