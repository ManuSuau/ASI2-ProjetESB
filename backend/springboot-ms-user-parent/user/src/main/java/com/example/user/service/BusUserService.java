package com.example.user.service;

import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import javax.jms.TextMessage;
@Service
public class BusUserService {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    ObjectMapper objectMapper;


    public void sendMsg(UserConnectedDTO userConnectedDTO, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+userConnectedDTO+"] to Bus=["+busName+"]");

        jmsTemplate.send(busName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(userConnectedDTO));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", userConnectedDTO.getClass().getCanonicalName());

                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public void sendMsg(UserLoginDTO userLoginDTO, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+ userLoginDTO +"] to Bus=["+busName+"]");

        jmsTemplate.send(busName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(userLoginDTO));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", userLoginDTO.getClass().getCanonicalName());

                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public void sendMsg(String message) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+message+"] to Bus=[NOTIFBUS]");

        jmsTemplate.send("NOTIFBUS", s -> {
            TextMessage msg = s.createTextMessage(message);
            return msg;
        });
    }
}
