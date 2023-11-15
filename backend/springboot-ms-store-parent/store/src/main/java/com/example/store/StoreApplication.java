package com.example.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.ConnectionFactory;

@SpringBootApplication
public class StoreApplication {

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

    public static void main(String[] args) {
        SpringApplication.run(StoreApplication.class, args);
    }

}
