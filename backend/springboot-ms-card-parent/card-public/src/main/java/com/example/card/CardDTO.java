package com.example.card.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO {


    private Integer id;


    private String name;


    private String imageUrl;


    private String description;


    private Long attack;


    private Long defense;


    private Long prix;


    private Long owner_id;


    public CardDTO(String name, String description, String imgUrl, int i, int i1, int i2, int i3) {
        this.name = name;
        this.description = description;
        this.imageUrl = imgUrl;
        this.attack = (long) i;
        this.defense = (long) i1;
        this.prix = (long) i2;
        this.owner_id = (long) i3;
    }
}