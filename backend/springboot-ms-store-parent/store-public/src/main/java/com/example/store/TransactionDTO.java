package com.example.store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {

    private Integer id;
    private Integer user_id;
    private Integer card_id;
    private LocalDate date;

    private TypeTransactionEnum type;

    public TransactionDTO(Integer user_id, Integer card_id,LocalDate d, TypeTransactionEnum tpe){
        this.user_id = user_id;
        this.card_id=card_id;
        this.date=d;
        this.type=tpe;
    }

}