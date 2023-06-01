package com.example.card.model;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "attack", nullable = false)
    private Long attack;

    @Column(name = "defense", nullable = false)
    private Long defense;

    @Column(name = "prix", nullable = false)
    private Long prix;

    @Column(name = "owner_id", nullable = false)
    private Integer ownerid;

}