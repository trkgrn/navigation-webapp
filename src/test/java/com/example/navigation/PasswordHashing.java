package com.example.navigation;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashing {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "tarik123";
        String pass2 = "123";
        String encodedPassword = encoder.encode(password);
        System.out.println(encodedPassword);
         encodedPassword = encoder.encode(pass2);
        System.out.println(encodedPassword);
    }
}
