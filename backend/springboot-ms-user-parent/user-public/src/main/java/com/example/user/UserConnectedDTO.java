package com.example.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserConnectedDTO {
    private Integer id;
    private String username;
    private String password;
    private int money;

    public UserConnectedDTO(String un, String pwd, int m) {
        this.username = un;
        this.password = pwd;
        this.money = m;
    }
}