package com.example.card.service;

import com.example.card.model.Card;
import com.example.card.CardDTO;
import com.example.card.repository.CardRepository;
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

    @Autowired
    private BusCardService busService;

    @Transactional
    public Card getCardByName(String i)  {
        Card card = cardRepository.findByName(i);
        return card;
    }

    @Transactional
    public CardDTO getCardById(Integer id)  {
        Optional<Card> card = cardRepository.findById(id);
        if(card.isPresent()){
            return mappeurCard(card.get());
        }
        return null;
    }

    @Transactional
    public Iterable<Card> getAllCard()  {
        Iterable<Card> listCard = cardRepository.findAll();
        return listCard;
    }


    public void addCard(Card card) {
        cardRepository.save(card);
        busService.sendMsg("Modification de votre liste de carte terminée");
    }


    public void PutCard(CardDTO card) {
        busService.sendMsg(card);
    }
    @Transactional
    public List<CardDTO> getCardByOwner(Long owner)  {
            return mappeurCards(cardRepository.findByOwner(owner));
    }

    public void deleteAll(){
        cardRepository.deleteAll();
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


    public Card mappeurDTO(CardDTO c){
        Card card = new Card();
        card.setId(c.getId());
        card.setName(c.getName());
        card.setAttack(c.getAttack());
        card.setDefense(c.getDefense());
        card.setDescription(c.getDescription());
        card.setPrix(c.getPrix());
        card.setImageUrl(c.getImageUrl());
        card.setOwnerid(Math.toIntExact(c.getOwner_id()));

        return card;
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
