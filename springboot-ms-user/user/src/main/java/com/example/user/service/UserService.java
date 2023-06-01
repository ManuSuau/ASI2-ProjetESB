package com.example.user.service;

import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import model.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;




    public void postUser(UserLoginDTO user){
        User u = new User();
        u.setUsername(user.getUsername());
        u.setPassword(user.getPassword());
        u.setMoney(5000);
        userRepository.save(u);
    }


    @Transactional
    public Optional<User> getCardById(Integer id)  {
        return userRepository.findById(id);
    }

    @Transactional
    public User getUserByUsernameAndPassword(String u, String p )  {
        return userRepository.findByUsernameAndPassword(u,p);
    }
}
