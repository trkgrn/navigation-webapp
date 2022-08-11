package com.navigation.business.abstracts;

import com.navigation.entity.concretes.User;

import java.util.List;

public interface UserService {
    User findByUserName(String userName);
    List<User> getAllByIdNotNull();
    User add(User user);

}
