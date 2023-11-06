package com.example.card.controller;

import com.example.card.model.Card;
import com.example.card.model.CardDTO;
import com.example.card.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping()
    public Iterable<Card> getAllCard(){
        return cardService.getAllCard();
    }

    @GetMapping("/{id}")
    public Optional<Card> findById(@PathVariable("id") Integer id){
        return cardService.getCardById(id);
    }

    @PutMapping("/{id}")
    public CardDTO ModifyById(@RequestBody CardDTO card){
        return cardService.PutCard(card);
    }

    @GetMapping("/owner")
    public List<CardDTO> findByOwner(@RequestParam("owner_id") Long owner_id){
        return cardService.getCardByOwner(owner_id);
    }

}
