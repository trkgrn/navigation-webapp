package com.navigation.controller;

import com.navigation.business.abstracts.DriverService;
import com.navigation.business.abstracts.UserService;
import com.navigation.entity.concretes.Driver;
import com.navigation.entity.concretes.User;
import com.navigation.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private DriverService driverService;



    @GetMapping("/")
    public String home()
    {
        return "Hello ElasticBeanstalk!";
    }


    @GetMapping("/getUser")
    public User getUser(@RequestParam String username){
        return this.userService.findByUserName(username);
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        return this.userService.getAllByIdNotNull();
    }


    @PostMapping(value = "/register")
    public ResponseEntity<?> add(@Valid @RequestBody User user){
        User addedUser = this.userService.add(user);
        if(addedUser.getRole().getRoleId()==1)
            this.driverService.addDriver(new Driver(addedUser));
        return  ResponseEntity.ok(addedUser);
    }

}
