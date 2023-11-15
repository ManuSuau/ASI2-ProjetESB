package com.example.store.service;

import com.example.store.TransactionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.jms.TextMessage;

@Service
public class BusStoreService {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    ObjectMapper objectMapper;


    public void sendMsg(TransactionDTO transactionDTO) {
        sendMsg(transactionDTO, "STOREBUS");
    }

    public void sendMsg(TransactionDTO transactionDTO, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+transactionDTO+"] to Bus=["+busName+"]");

        jmsTemplate.send(busName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(transactionDTO));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", transactionDTO.getClass().getCanonicalName());

                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }


}
