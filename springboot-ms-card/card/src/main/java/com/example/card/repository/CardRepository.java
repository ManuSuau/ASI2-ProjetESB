package com.example.card.repository;

import com.example.card.model.Card;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends CrudRepository<Card, Integer> {
    Card findByName(String i);
    Card save(Card card);

    @Query(value = "SELECT c.* FROM card c WHERE c.owner_id = :owner_id", nativeQuery = true)
    Iterable<Card>  findByOwner(@Param("owner_id") Long o);


    @Query(value = "SELECT c.* FROM card c WHERE c.owner_id is NULL", nativeQuery = true)
    Iterable<Card> findCardWithoutOwner();

    @Query(value = "UPDATE card SET owner_id = :owner_id WHERE id = :card_id", nativeQuery = true)
    Iterable<Card> updateOwnerOfCard(@Param("owner_id")Long owner_id,@Param("card_id")Long id);



}
