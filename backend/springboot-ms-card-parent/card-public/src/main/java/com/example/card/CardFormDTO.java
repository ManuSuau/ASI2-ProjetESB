package com.example.card;

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


}
