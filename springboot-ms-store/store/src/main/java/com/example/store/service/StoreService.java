package com.example.store.service;

import model.CardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    public CardDTO buyCard(Integer card_id, Long owner_id)  {
        Card c =  cardRepository.findById(card_id)
                .orElseThrow(() -> new RuntimeException("user not found"));
        User u = userRepository.findById(owner_id.intValue())
                .orElseThrow(() -> new RuntimeException("user not found"));
        c.setOwner(u);
        if(u.getMoney()>c.getPrix()) {
            u.setMoney((int) (u.getMoney()-c.getPrix()));
            userRepository.save(u);
            return mappeurCard(cardRepository.save(c));
        }else{
            return null;
        }
    }

    public CardDTO sellCard(Integer card_id)  {
        Card c =  cardRepository.findById(card_id)
                .orElseThrow(() -> new RuntimeException("user not found"));
        User u = userRepository.findById(c.getOwner().getId())
                .orElseThrow(() -> new RuntimeException("user not found"));
        u.setMoney((int) (u.getMoney()+c.getPrix()));
        userRepository.save(u);
        c.setOwner(null);
        return mappeurCard(cardRepository.save(c));
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
        if(c.getOwner()!= null){
            dto.setOwner_id(c.getOwner().getId().longValue());
        }
        return dto;
    }
}
