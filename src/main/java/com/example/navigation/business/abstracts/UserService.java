package com.example.navigation.business.abstracts;

import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.entity.concretes.User;

public interface UserService {

    DataResult<User> findByUserName(String userName);
}
