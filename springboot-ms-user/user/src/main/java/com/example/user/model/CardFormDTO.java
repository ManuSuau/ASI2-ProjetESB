package com.example.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardFormDTO {
    private String id;
    private String name;
    private String image_url;
    private String desc;
    private int attack;
    private int defense;
    private String owner;

    public CardFormDTO() {
        this.id = "";
        this.name = "";
        this.image_url = "";
        this.desc = "";
        this.attack = 0;
        this.defense = 0;
        this.owner = "";
    }

    public CardFormDTO(String id, String name, String image_url, String desc, int attack, int defense, String owner) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.desc = desc;
        this.attack = attack;
        this.defense = defense;
        this.owner = owner;
    }

}
