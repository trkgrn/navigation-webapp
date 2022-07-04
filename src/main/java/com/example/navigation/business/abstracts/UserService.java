package com.example.navigation.business.abstracts;

import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.core.utilities.results.Result;
import com.example.navigation.entity.concretes.User;

import java.util.List;

public interface UserService {

    DataResult<User> findByUserName(String userName);
    DataResult<List<User>> getAllByIdNotNull();
    Result add(User user);
}
