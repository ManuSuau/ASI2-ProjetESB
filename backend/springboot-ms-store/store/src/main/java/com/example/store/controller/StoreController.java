package com.example.store.controller;

import com.example.card.model.CardDTO;
import com.example.store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("store")
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/buy")
    public CardDTO buyCard(@RequestParam("card_id") Integer card_id, @RequestParam("user_id") Integer user_id) throws IOException {
        return storeService.buyCard(card_id,user_id.longValue());
    }

    @GetMapping("/sell")
    public CardDTO sellCard(@RequestParam("card_id") Integer card_id) throws IOException {
        return storeService.sellCard(card_id);
    }

}