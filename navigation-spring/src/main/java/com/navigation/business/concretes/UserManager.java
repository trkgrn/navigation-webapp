package com.navigation.business.concretes;

import com.navigation.business.abstracts.UserService;
import com.navigation.entity.concretes.User;
import com.navigation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    public User findByUserName(String userName) {
        return this.userRepository.findByUsername(userName);
    }

    @Override
    public List<User> getAllByIdNotNull() {
        return this.userRepository.getAllByIdNotNull();
    }

    @Override
    public User add(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
      User addedUser =  this.userRepository.save(user);
        return addedUser;
    }
}
