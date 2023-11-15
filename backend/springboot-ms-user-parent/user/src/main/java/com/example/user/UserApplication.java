package com.example.user;

import com.example.user.UserConnectedDTO;
import com.example.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.ConnectionFactory;

@SpringBootApplication
public class UserApplication {

    @Autowired
    private UserService userService;

    @Autowired
    JmsTemplate jmsTemplate;


    @Bean
    public JmsListenerContainerFactory< ? > connectionFactory(ConnectionFactory connectionFactory,
                                                              DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory);
        // You could still override some of Boot's default if necessary.

        //enable queue mode
        factory.setPubSubDomain(false);
        return factory;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void doInitAfterStartup() {
        userService.deleteAll();
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
