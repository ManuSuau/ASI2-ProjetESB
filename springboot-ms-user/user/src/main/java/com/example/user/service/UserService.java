package com.example.user.service;

import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import com.example.user.model.CardDTO;
import com.example.user.model.UserConnectedDTO;
import com.example.user.model.UserLoginDTO;
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



    public UserConnectedDTO PutUser(UserConnectedDTO u) {
        User user = new User();
        user.setId(user.getId());
        user.setUsername(u.getUsername());
        user.setPassword(u.getPassword());
        user.setMoney(u.getMoney());
        userRepository.save(user);
        return u;
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
