package com.example.card;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.util.*;

import com.example.card.model.Card;
import com.example.card.model.CardDTO;
import com.example.card.repository.CardRepository;
import com.example.card.service.CardService;
import org.junit.*;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;

import com.example.card.model.*;
import com.example.card.repository.*;

@RunWith(MockitoJUnitRunner.class)
public class CardServiceTest {

    @Mock
    private CardRepository cardRepository;

    @InjectMocks
    private CardService cardService;

    @Test
    public void doit_retourner_la_carte_correcte_par_nom() {
        // Given
        Card card = new Card();
        card.setName("Test");

        // When
        when(cardRepository.findByName("Test")).thenReturn(card);
        Card result = cardService.getCardByName("Test");

        // Then
        assertEquals(card, result);
        verify(cardRepository).findByName("Test");
    }

    @Test
    public void doit_retourner_la_carte_correcte_par_id() {
        // Given
        Card card = new Card();
        card.setId(1);

        // When
        when(cardRepository.findById(1)).thenReturn(Optional.of(card));
        Optional<Card> result = cardService.getCardById(1);

        // Then
        assertEquals(Optional.of(card), result);
        verify(cardRepository).findById(1);
    }
    @Test
    public void doit_retourner_toutes_les_cartes() {
        // Given
        List<Card> cards = new ArrayList<>();
        cards.add(new Card());
        cards.add(new Card());

        // When
        when(cardRepository.findAll()).thenReturn(cards);
        Iterable<Card> result = cardService.getAllCard();

        // Then
        assertEquals(cards, result);
        verify(cardRepository).findAll();
    }

    @Test
    public void doit_ajouter_une_carte() {
        // Given
        Card card = new Card();
        card.setId(1);
        card.setName("Test Card");

        // When
        Card result = cardService.addCard(card);

        // Then
        assertEquals(card, result);
        verify(cardRepository).save(card);
    }

    @Test
    public void doit_retourner_la_carte_correcte_par_owner() {
        // Given
        List<Card> cards = new ArrayList<>();
        cards.add(new Card());
        cards.add(new Card());

        // When
        when(cardRepository.findByOwner(1L)).thenReturn(cards);
        List<CardDTO> result = cardService.getCardByOwner(1L);

        // Then
        assertEquals(cards.size(), result.size());
        verify(cardRepository).findByOwner(1L);
    }
}