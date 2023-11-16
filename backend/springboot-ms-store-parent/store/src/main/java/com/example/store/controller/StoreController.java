package com.example.store.controller;


import com.example.card.CardDTO;
import com.example.store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping("store")
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/buy")
    public String buyCard(@RequestParam("card_id") Integer card_id, @RequestParam("user_id") Integer user_id) throws IOException {
        storeService.buyCard(card_id,user_id.longValue());
        return "carte en cours d'achat";
    }

    @GetMapping("/sell")
    public String sellCard(@RequestParam("card_id") Integer card_id) throws IOException {
        storeService.sellCard(card_id);
        return "carte en cours de vente";
    }

}