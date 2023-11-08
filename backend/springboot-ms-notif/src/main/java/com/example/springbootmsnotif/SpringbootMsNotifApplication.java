package com.example.springbootmsnotif;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.destination.DynamicDestinationResolver;

import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Session;

@EnableJms
@SpringBootApplication
public class SpringbootMsNotifApplication {

    @Autowired
    JmsTemplate jmsTemplate;


    @Bean
    public JmsListenerContainerFactory< ? > connectionFactory(ConnectionFactory connectionFactory,
                                                              DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory);
        // You could still override some of Boot's default if necessary.

        //enable topic mode
        factory.setPubSubDomain(false);
        return factory;
    }


    @Bean
    public DynamicDestinationResolver destinationResolver() {
        return new DynamicDestinationResolver() {
            @Override
            public Destination resolveDestinationName(Session session, String destinationName, boolean pubSubDomain) throws JMSException {
                String prefixTopic = "topic.";
                String prefixQueue = "queue.";
                if (destinationName.startsWith(prefixTopic) || destinationName.startsWith(prefixQueue)) {
                    if (destinationName.startsWith(prefixTopic)) {
                        pubSubDomain = true;
                        destinationName = destinationName.replace(prefixTopic, "");
                    } else {
                        destinationName = destinationName.replace(prefixQueue, "");
                    }
                }
                return super.resolveDestinationName(session, destinationName, pubSubDomain);
            }
        };
    }



    public static void main(String[] args) {
        SpringApplication.run(SpringbootMsNotifApplication.class, args);
    }

}

