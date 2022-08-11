package com.navigation.controller;

import com.navigation.business.abstracts.UserService;
import com.navigation.entity.concretes.User;
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

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService= userService;
    }


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
        return  ResponseEntity.ok(this.userService.add(user));
    }

}
