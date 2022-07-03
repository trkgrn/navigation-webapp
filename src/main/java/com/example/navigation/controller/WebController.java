package com.example.navigation.controller;

import com.example.navigation.business.abstracts.UserService;
import com.example.navigation.core.utilities.results.DataResult;
import com.example.navigation.entity.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class WebController {
   private UserService userService;

    @Autowired
     public WebController(UserService userService){
         this.userService= userService;
     }

     @GetMapping("/")
    public String login(){
        return "Dogrulama başarılı";
     }
     @GetMapping("/home")
    public String home(){
        return "Home";
     }


}
