package com.example.navigation.business.concretes;

import com.example.navigation.business.abstracts.UserService;
import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.core.utilities.results.Result;
import com.example.navigation.core.utilities.results.SuccessDataResult;
import com.example.navigation.core.utilities.results.SuccessResult;
import com.example.navigation.dataAccess.abstracts.UserRepository;
import com.example.navigation.entity.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManager implements UserService {


    UserRepository userRepository;

    @Autowired
    public UserManager(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public DataResult<User> findByUserName(String userName) {
        return new SuccessDataResult<User>(this.userRepository.findByUsername(userName),"Kullanıcı bulundu!");
    }

    @Override
    public DataResult<List<User>> getAllByIdNotNull() {
        return new  SuccessDataResult<List<User>>(this.userRepository.getAllByIdNotNull(),"Kullanıcılar listelendi!");
    }

    @Override
    public Result add(User user) {
        this.userRepository.save(user);
        return new SuccessResult("Kullanıcı eklendi!");
    }
}
