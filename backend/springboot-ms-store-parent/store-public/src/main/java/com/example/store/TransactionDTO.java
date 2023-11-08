package com.example.store;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransactionDTO {

    private Integer id;
    private Integer user_id;
    private Integer card_id;
    private Date date;

    private TypeTransactionEnum type;


}