package com.navigation.business.abstracts;

import com.navigation.entity.concretes.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();
}
