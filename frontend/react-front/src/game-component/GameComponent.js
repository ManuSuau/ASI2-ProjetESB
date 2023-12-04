
import HeaderBox from "../utilities/header";
import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Card, Divider, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUser} from "../store/actions";
import {io} from "socket.io-client";
import {useLocation} from "react-router-dom";
import PokemonCard from "../utilities/pokemonCard";

function GameComponent() {
    const location = useLocation();
    const { state } = location;
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState('');
    const [gamePoints, setGamePoints] = useState(0);
    const [opponentGamePoints, setOpponentGamePoints] = useState(0);
    const [canAttack, setCanAttack] = useState(false);
    const [opponentCards, setOpponentCards] = useState([]);
    const [myAttackCard, setMyAttackCard] = useState(null);
    const [opponentAttackCard, setOpponentAttackCard] = useState(null);
    const loggedUser  = useSelector(selectUser);
    const [hasAttacked, setHasAttacked] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);

    // Access the 'cards' value from the state
    const { cards, allCards } = state;
    const [userCards, setUserCards] = useState(cards);

    const socket = io('http://localhost:9000');

    function updateCards(cards) {
        console.log("update cards", cards)
        let newCards = userCards.map((card) => {
            console.log("card", card)
            let newCard = cards.find((c) => c.cardid === card.id);
            if (newCard) {
                card.defense = newCard.defense;
            }
            return card;
        });
        setUserCards(newCards);
    }

    function updateOpponentCards(cards) {
        console.log("update opponent cards", cards)
        let cardIds = cards.map((card) => card.cardid);
        let newCards = allCards.filter((card) => cardIds.includes(card.id))
        newCards = newCards.map((card) => {
            let newCard = cards.find((c) => c.cardid === card.id);
            if (newCard) {
                card.defense = newCard.defense;
            }
            return card;
        });

        console.log(newCards)
        setOpponentCards(newCards);
    }



    //start the connection with the server and send the cards of the player
    useEffect(() => {
        //retrieve all cards from the database


        socket.connect();
        console.log("CONNEXION")
        socket.emit('startgame', {
            userId: loggedUser.id,
            cards: userCards.map((card) => ({
                cardId: card.id,
                attaque: card.attack,
                defense: card.defense,
            })),
        }, () => {
            setHasGameStarted(true)
            console.log('Game started')
        });
    }, []);

    //retrieve the game data when the game starts
    useEffect( () => {
        socket.on('game_start', async (data) => {
            console.log(data);
            setMessage("We found an opponent, now you can choose one of your cards and one of your opponent's cards in order to make an attack");
            setOpenSnackBar(true);
            setGamePoints(data.myDetails.GamePoint)
            setOpponentGamePoints(data.opponent.GamePoint)
            let cardIds = data.opponent.cards.map((card) => card.cardid);
            console.log("cardIds", cardIds, allCards.length)
            setOpponentCards(allCards.filter((card) => cardIds.includes(card.id)))
            console.log("opponent cards", opponentCards);
            setCanAttack(data.myDetails.canAttack);
        });


    }, [ hasGameStarted]);

    useEffect( () => {
        socket.on('resultat_attaque', (data) => {
            console.log("resultat_attaque", data);
            //check if gamePoint changed
            if (data.looser || data.winner) {
                if (data.looser === loggedUser.id) {
                    setMessage("You lost the game. Your opponent takes 100$ from you.");
                    setOpenSnackBar(true);
                }
                else if (data.winner === loggedUser.id){
                    setMessage("You won the game, you take 100$ from your opponent.");
                    setOpenSnackBar(true);
                }
            }
            else {
                if (data.myDetails.GamePoint !== gamePoints) {
                    setHasAttacked(false);
                    setGamePoints(data.myDetails.GamePoint);
                }else {
                    setGamePoints(data.myDetails.GamePoint);
                }
                setOpponentGamePoints(data.opponent.GamePoint);
                setCanAttack(data.myDetails.canAttack);
                updateCards(data.myDetails.cards);
                updateOpponentCards(data.opponent.cards);
            }


        });
        }, []);




    //make a player choose a card of its own as well as a card of the opponent
    function handleCardClick(id) {
        if (canAttack) {
            setMyAttackCard(id);
        }
    }

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    function handleOpponentCardClick(id) {
        if (canAttack) {
            setOpponentAttackCard(id);
        }
    }

    function attackOpponent() {
        if (myAttackCard && opponentAttackCard) {
            console.log("attaque", myAttackCard, opponentAttackCard)
            let userId = loggedUser.id;
            let cardId = myAttackCard;
            let opponentCardId = opponentAttackCard;
            socket.emit('attaque', { userId, cardId, opponentCardId }, () => {
                setHasAttacked(true);
            });
        }
        else {
            setMessage("You must choose a card of your own and a card of your opponent in order to make an attack");
            setOpenSnackBar(true);
        }
    }

    function endMyTurn() {
        let userId = loggedUser.id;
        socket.emit('endTurn', {
            userId,
        }, () => {
        });
    }

    return (
        <div >
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <HeaderBox title={"Game"} />
            <Card style={{ backgroundColor: "#ffc6c4" }}>
                <div>
                    {opponentCards ?
                        <div className="card-deck" style={{display : "flex",flexDirection : 'row', gap : 50, alignItems : "center",justifyContent : "center" }}>
                            {opponentCards.map((card) => (
                                <div style={{  cursor: card.defense <= 0 ? null :  'pointer', border : "medium" , borderColor : "blue", width : 200, }} onClick={() => {card.defense <= 0 ? console.log("") : handleOpponentCardClick(card.id)}}>
                                    <PokemonCard key={card.id}
                                                 name={card.name}
                                                 imageURL={card.imageUrl}
                                                 attack={card.attack}
                                                 defense={card.defense}
                                                 description={card.description}
                                                 isGame={true}
                                                 isChoosenForAttack={card.id === opponentAttackCard}
                                    />
                                </div>
                            ))}
                        </div>
                        : <h2>Waiting for an opponent..</h2>}
                </div>
            </Card>
            <Divider>Your Game points : {gamePoints} | Opponent's Game Points : {opponentGamePoints} </Divider>
            <Button variant="contained" color="primary" disabled={gamePoints == 0 || !canAttack}  onClick={()=> {attackOpponent()}}>Attack</Button>
            <Button variant="contained" color="primary" disabled={!canAttack}  onClick={()=> {endMyTurn()}}>End turn</Button>

            <Card style={{ backgroundColor: "lightblue", }}>
                <div className="card-deck" style={{display : "flex",flexDirection : 'row', gap : 50, alignItems : "center",justifyContent : "center" }}>
                    {userCards.map((card) => (
                        <div style={{  cursor: 'pointer', border : "medium" , borderColor : "blue", width : 200, }} onClick={() => {handleCardClick(card.id)}}>
                            <PokemonCard key={card.id}
                                         name={card.name}
                                         imageURL={card.imageUrl}
                                         attack={card.attack}
                                         defense={card.defense}
                                         description={card.description}
                                         isGame={true}
                                         isChoosen={card.id === myAttackCard}
                                        />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default GameComponent;
