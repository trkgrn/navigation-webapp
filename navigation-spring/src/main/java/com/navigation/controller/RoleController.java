package com.navigation.controller;

import com.navigation.business.abstracts.RoleService;
import com.navigation.entity.concretes.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RoleController {

    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService){
        this.roleService = roleService;
    }

    @GetMapping("/getAllRoles")
   public List<Role> findAll(){
       return this.roleService.findAll();
   }
}
