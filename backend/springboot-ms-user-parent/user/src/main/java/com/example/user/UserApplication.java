package com.example.user;

import com.example.user.model.UserConnectedDTO;
import com.example.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class UserApplication {

    @Autowired
    private UserService userService;

    @EventListener(ApplicationReadyEvent.class)
    public void doInitAfterStartup() {//enable to be in topic mode! to do at start
        UserConnectedDTO user1 = new UserConnectedDTO("simon", "pws", 500);
        userService.addUser(user1);
        UserConnectedDTO user2 = new UserConnectedDTO("manu", "pws", 500);
        userService.addUser(user2);
        UserConnectedDTO user3 = new UserConnectedDTO("walid", "pws", 500);
        userService.addUser(user3);
        UserConnectedDTO user4 = new UserConnectedDTO("rayane", "pws", 500);
        userService.addUser(user4);

    }
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }

}
