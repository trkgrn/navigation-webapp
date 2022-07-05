package com.example.navigation.controller;

import com.example.navigation.business.abstracts.UserService;
import com.example.navigation.core.utilities.results.ErrorDataResult;
import com.example.navigation.entity.concretes.User;
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

     @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        return this.userService.getAllByIdNotNull().getData();
     }


     @PostMapping(value = "/register")
    public ResponseEntity<?> add(@Valid @RequestBody User user){
        return  ResponseEntity.ok(this.userService.add(user));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationException(MethodArgumentNotValidException exceptions){
        Map<String,String> validationErrors = new HashMap<String, String>();
        for (FieldError fieldError: exceptions.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new ErrorDataResult<Object>(validationErrors,"Doğrulama hataları");
    }


}
