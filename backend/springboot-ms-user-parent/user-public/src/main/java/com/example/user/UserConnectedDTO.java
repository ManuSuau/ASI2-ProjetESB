package com.example.user.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserConnectedDTO {
    private Integer id;
    private String username;
    private String password;
    private int money;
}