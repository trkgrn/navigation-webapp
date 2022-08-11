package com.navigation.business.concretes;

import com.navigation.business.abstracts.RoleService;
import com.navigation.entity.concretes.Role;
import com.navigation.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleManager implements RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleManager (RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }


    @Override
    public List<Role> findAll() {
        return this.roleRepository.findAll();
    }
}
