package com.example.card;

import com.example.card.model.Card;
import com.example.card.CardDTO;
import com.example.card.service.CardService;
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

@SpringBootApplication
@EnableJms
public class CardApplication {
    @Autowired
    private CardService cardService;

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
        cardService.deleteAll();
        CardDTO card1 = new CardDTO("Bulbasaur", "A grass and poison-type Pokémon with a plant bulb on its back.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card1));
        CardDTO card2 = new CardDTO("Charmander", "A fire-type Pokémon with a flame burning on the end of its tail.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card2));
        CardDTO card3 = new CardDTO("Squirtle", "A water-type Pokémon with a shell on its back and a tail.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card3));
        CardDTO card4 = new CardDTO("Pikachu", "An electric-type Pokémon with a tail shaped like a lightning bolt.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card4));
        CardDTO card5 = new CardDTO("Eevee", "A normal-type Pokémon with an unstable genetic makeup.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card5));
        CardDTO card6 = new CardDTO("Mewtwo", "A psychic-type Pokémon created by genetic engineering.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card6));
        CardDTO card7 = new CardDTO("Mew", "A psychic-type Pokémon that was created by genetic engineering.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card7));
        CardDTO card8 = new CardDTO("Snorlax", "A normal-type Pokémon that is always sleeping.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card8));
        CardDTO card9 = new CardDTO("Dragonite", "A dragon and flying-type Pokémon that is capable of circling the globe in just 16 hours.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card9));
        CardDTO card10 = new CardDTO("Machamp", "A fighting-type Pokémon that is capable of mastering any kind of martial art.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card10));
        CardDTO card11 = new CardDTO("Gengar", "A ghost and poison-type Pokémon that hides in the shadows.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card11));
        CardDTO card12 = new CardDTO("Gyarados", "A water and flying-type Pokémon that is capable of destroying entire cities in a rage.", "", 2, 2, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card12));
    }
    public static void main(String[] args) {
        SpringApplication.run(CardApplication.class, args);

    }

}
