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
        CardDTO card1 = new CardDTO("Bulbasaur", "A grass and poison-type Pokémon with a plant bulb on its back.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", 5, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card1));

        CardDTO card2 = new CardDTO("Charmander", "A fire-type Pokémon with a flame burning on the end of its tail.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", 6, 4, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card2));

        CardDTO card3 = new CardDTO("Squirtle", "A water-type Pokémon with a shell on its back and a tail.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", 5, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card3));

        CardDTO card4 = new CardDTO("Pikachu", "An electric-type Pokémon with a tail shaped like a lightning bolt.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", 7, 4, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card4));

        CardDTO card5 = new CardDTO("Eevee", "A normal-type Pokémon with an unstable genetic makeup.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png", 4, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card5));

        CardDTO card6 = new CardDTO("Mewtwo", "A psychic-type Pokémon created by genetic engineering.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", 8, 7, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card6));

        CardDTO card7 = new CardDTO("Mew", "A psychic-type Pokémon that was created by genetic engineering.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png", 7, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card7));

        CardDTO card8 = new CardDTO("Snorlax", "A normal-type Pokémon that is always sleeping.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png", 4, 8, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card8));

        CardDTO card9 = new CardDTO("Dragonite", "A dragon and flying-type Pokémon that is capable of circling the globe in just 16 hours.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png", 8, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card9));

        CardDTO card10 = new CardDTO("Machamp", "A fighting-type Pokémon that is capable of mastering any kind of martial art.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png", 7, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card10));

        CardDTO card11 = new CardDTO("Gengar", "A ghost and poison-type Pokémon that hides in the shadows.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png", 7, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card11));

        CardDTO card12 = new CardDTO("Gyarados", "A water and flying-type Pokémon that is capable of destroying entire cities in a rage.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png", 9, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card12));

        CardDTO card13 = new CardDTO("Jigglypuff", "A normal and fairy-type Pokémon known for its soothing lullabies.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", 3, 7, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card13));

        CardDTO card14 = new CardDTO("Vaporeon", "A water-type Pokémon that evolves from Eevee when exposed to a Water Stone.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png", 8, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card14));

        CardDTO card15 = new CardDTO("Alakazam", "A psychic-type Pokémon known for its high intelligence and powerful psychic abilities.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png", 9, 4, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card15));

        CardDTO card16 = new CardDTO("Arcanine", "A fire-type Pokémon known for its legendary loyalty and impressive speed.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png", 7, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card16));

        CardDTO card17 = new CardDTO("Gyarados", "A water and flying-type Pokémon that is capable of destroying entire cities in a rage.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png", 9, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card17));

        CardDTO card18 = new CardDTO("Nidoking", "A poison and ground-type Pokémon known for its strength and imposing presence.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png", 8, 7, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card18));

        CardDTO card19 = new CardDTO("Golem", "A rock and ground-type Pokémon that evolves from Graveler when traded.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png", 7, 8, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card19));

        CardDTO card20 = new CardDTO("Ninetales", "A fire-type Pokémon known for its mystical and elegant appearance.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png", 6, 6, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card20));

        CardDTO card21 = new CardDTO("Machoke", "A fighting-type Pokémon known for its powerful muscles and imposing strength.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png", 6, 7, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card21));

        CardDTO card22 = new CardDTO("Electabuzz", "An electric-type Pokémon known for its speed and powerful electric attacks.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png", 8, 4, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card22));

        CardDTO card23 = new CardDTO("Pidgeot", "A normal and flying-type Pokémon that evolves from Pidgeotto.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png", 7, 5, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card23));

        CardDTO card24 = new CardDTO("Jolteon", "An electric-type Pokémon that evolves from Eevee when exposed to a Thunder Stone.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png", 9, 3, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card24));

        CardDTO card25 = new CardDTO("Lapras", "A water and ice-type Pokémon known for its gentle nature and musical abilities.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png", 6, 7, 250, 0);
        cardService.addCard(cardService.mappeurDTO(card25));

    }
    public static void main(String[] args) {
        SpringApplication.run(CardApplication.class, args);

    }

}
