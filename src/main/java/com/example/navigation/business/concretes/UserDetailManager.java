package com.example.navigation.business.concretes;

import com.example.navigation.dataAccess.abstracts.UserRepository;
import com.example.navigation.entity.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailManager implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        if (user==null)
            throw new UsernameNotFoundException("Kullanıcı bulunamadı!");

        return new CustomUserDetails(user);
    }
}
