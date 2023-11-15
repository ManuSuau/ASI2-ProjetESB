package com.example.user.controller;

import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.example.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.TextMessage;
import java.io.IOException;

@Component
public class BusUserListener {
    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    private void doReceive(TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            Object o = objectMapper.readValue(message.getText(), Class.forName(clazz));

            if (o instanceof UserLoginDTO) {
                UserLoginDTO userLoginDTO = (UserLoginDTO) o;
                userService.addUserByLogin(userLoginDTO);
            } else if (o instanceof UserConnectedDTO) {
                UserConnectedDTO userConnectedDTO = (UserConnectedDTO) o;
                userService.addUser(userConnectedDTO);
            }

            System.out.println("[BUSLISTENER] [CHANNEL USERBUS] RECEIVED String MSG=["+message.getText()+"]");
        } catch (IOException | JMSException | ClassNotFoundException  e) {
            throw new RuntimeException(e);
        }
    }


    @JmsListener(destination = "USERBUS", containerFactory = "connectionFactory")
    public void receiveMessageCard(TextMessage message) {
        doReceive(message);
    }

}