package com.example.user.service;

import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusUserService busUserService;



    @Transactional
    public Iterable<User> getAllUser()  {
        Iterable<User> listUser = userRepository.findAll();
        return listUser;
    }
    public void postUser(UserLoginDTO user){
        busUserService.sendMsg(user,"USERBUS");
    }

    public void PutUser(UserConnectedDTO u) {
        busUserService.sendMsg(u,"USERBUS");
    }

    public void addUser(UserConnectedDTO u) {
        User user = new User();
        if(u.getId()!=null){
            user.setId(u.getId());
        }
        user.setUsername(u.getUsername());
        user.setPassword(u.getPassword());
        user.setMoney(u.getMoney());
        userRepository.save(user);
        busUserService.sendMsg("votre porte-feuille virtuel à été mis à jour");
    }

    public void addUserByLogin(UserLoginDTO u) {
        User user = new User();
        user.setUsername(u.getUsername());
        user.setPassword(u.getPassword());
        user.setMoney(5000);
        userRepository.save(user);
        busUserService.sendMsg("L'utilisateur"+u.getUsername()+"à été crée");
    }

    @Transactional
    public Optional<User> getCardById(Integer id)  {
        return userRepository.findById(id);
    }

    @Transactional
    public User getUserByUsernameAndPassword(String u, String p )  {
        return userRepository.findByUsernameAndPassword(u,p);
    }

    public void deleteAll(){
        userRepository.deleteAll();
    }
}