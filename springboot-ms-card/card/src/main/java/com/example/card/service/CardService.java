package com.example.card.service;

import com.example.card.model.Card;
import com.example.card.repository.CardRepository;
import model.CardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {


    @Autowired
    private CardRepository cardRepository;


    @Transactional
    public Card getCardByName(String i)  {
        Card card = cardRepository.findByName(i);
        return card;
    }

    @Transactional
    public Optional<Card> getCardById(Integer id)  {
        Optional<Card> card = cardRepository.findById(id);
        return card;
    }

    @Transactional
    public Iterable<Card> getAllCard()  {
        Iterable<Card> listCard = cardRepository.findAll();
        return listCard;
    }


    public Card addCard(Card card) {
        cardRepository.save(card);
        return card;
    }

    @Transactional
    public List<CardDTO> getCardByOwner(Long owner)  {
        if(owner>=0){
            return mappeurCards(cardRepository.findByOwner(owner));
        }else{
            return mappeurCards(cardRepository.findCardWithoutOwner());
        }


    }

    public CardDTO mappeurCard(Card c){
        CardDTO dto = new CardDTO();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setImageUrl(c.getImageUrl());
        dto.setPrix(c.getPrix());
        dto.setAttack(c.getAttack());
        dto.setDefense(c.getDefense());
        dto.setDescription(c.getDescription());
        dto.setOwner_id(c.getOwnerid().longValue());

        return dto;
    }

    public List<CardDTO> mappeurCards(Iterable<Card> card){
        List<CardDTO> itDto = new ArrayList<>();
        for(Card c: card) {
            CardDTO dto = new CardDTO();
            dto.setId(c.getId());
            dto.setName(c.getName());
            dto.setImageUrl(c.getImageUrl());
            dto.setPrix(c.getPrix());
            dto.setAttack(c.getAttack());
            dto.setDefense(c.getDefense());
            dto.setDescription(c.getDescription());
            dto.setOwner_id(c.getOwnerid().longValue());
            itDto.add(dto);
        }
        return itDto;
    }







}