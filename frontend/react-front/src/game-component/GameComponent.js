
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
    const [gameData, setGameData] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState('');
    const [gamePoints, setGamePoints] = useState(0);
    const [opponentGamePoints, setOpponentGamePoints] = useState(0);
    const [canAttack, setCanAttack] = useState(gamePoints > 0);
    const [allCards, setAllCards] = useState([]);
    const [opponentCards, setOpponentCards] = useState([]);
    const [myAttackCard, setMyAttackCard] = useState(null);
    const [opponentAttackCard, setOpponentAttackCard] = useState(null);

    // Access the 'cards' value from the state
    const { cards } = state;
    const socket = io('http://localhost:3001');


    const fetchData = async ( ownerId) => {
        try {
            let url = `http://localhost:8081/cards`;

            const response = await fetch(url);
            const data = await response.json();
            setAllCards(data);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        }
    };



    useEffect(() => {
        //retrieve all cards from the database
        fetchData().then(r => console.log("cards fetched"));

        socket.connect();
        socket.emit('startgame', {
            userId: loggedUser.id,
            cards: cards.map((card) => ({
                cardId: card.id,
                attack: card.attack,
                defense: card.defense,
            })),
        }, () => {
        });

        socket.on('game_start', (data) => {
            console.log(data);
            setMessage("We found an opponent, now you can choose one of your cards and one of your opponent's cards in order to make an attack");
            setOpenSnackBar(true);
            setGamePoints(data.myDetails.GamePoint)
            setOpponentGamePoints(data.opponent.GamePoint)
            let cardIds = data.opponent.cards.map((card) => card.cardid);
            setOpponentCards(allCards.filter((card) => cardIds.includes(card.id)))
            setGameData(data);
        });
    }, [opponentCards]);

    const loggedUser  = useSelector(selectUser);


    //make a player choose a card of its own as well as a card of the opponent
    function handleCardClick(id) {
        if (canAttack) {
            setMyAttackCard(id);
            socket.emit('attaque', {
                userId: loggedUser.id,
                opponentId: gameData.opponent.id,
                myCardId: id,
                opponentCardId: gameData.opponent.cards[0].cardid,
            }, () => {
            });
        }
    }

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div>
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
                                <div style={{  cursor: 'pointer', border : "medium" , borderColor : "blue", width : 200, }} onClick={() => {handleCardClick(card.id)}}>
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
            <Button variant="contained" color="primary">Attack</Button>
            <Card style={{ backgroundColor: "lightblue", }}>
                <div className="card-deck" style={{display : "flex",flexDirection : 'row', gap : 50, alignItems : "center",justifyContent : "center" }}>
                    {cards.map((card) => (
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
