import {useSelector} from "react-redux";
import HeaderBox from "../utilities/header";
import React, {useEffect, useState} from "react";
import PokemonCard from "../utilities/pokemonCard";
import {Alert, Button, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";

function CardChoiceComponent() {
    const socket = io('http://localhost:3333');
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [allCards, setAllCards] = useState([]);
    const fetchData = async (ownerId) => {
        try {
            let url = `http://localhost:8081/cards/owner?owner_id=${ownerId}`;
            const response = await fetch(url);
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        }
    };

    const fetchAllData = async ( ) => {
        try {
            let url = `http://localhost:8081/cards`;

            const response = await fetch(url);
            const data = await response.json();
            setAllCards(data);
            console.log("all cards")
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        }
    };

    useEffect(() => {
        socket.connect();
        // Handle events within useEffect
        socket.on('connect', () => {
            console.log('Connected to the WebSocket');
        });
        fetchData(user.id).then(r => console.log(r));
        fetchAllData(user.id).then(r => console.log(r));

    }, []);

    // return a page with the user's cards using the CardComponent making it clickable and let them choose 3 to play with


    function handleCardClick(id) {
        const isCardSelected = selectedCards.includes(id);

        if (isCardSelected) {
            // If the card is already selected, remove it from the selectedCards
            setSelectedCards(selectedCards.filter(cardId => cardId !== id));
        } else {
            // If the card is not selected, check if the total selected cards is less than 3
            if (selectedCards.length < 3) {
                setSelectedCards([...selectedCards, id]);
            } else {
                setMessage("You can only choose up to 3 cards.");
                setOpenSnackBar(true);
            }
        }
    }


    const isCardSelected = (id) => {
        return selectedCards.includes(id);
    }

    function handleClose() {
        setOpenSnackBar(false);
    }

    async function playAction() {

        if (selectedCards.length === 3) {
            navigate('/play', {
                state: {
                    cards:
                        cards.filter(card => selectedCards.includes(card.id)),
                    allCards: allCards
                }
            });

        } else {
            setMessage("You must choose 3 cards to play");
            setOpenSnackBar(true);
        }
    }

    return (
    <div>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <HeaderBox title={"Choose your cards"}/>
        <div>
            <div >
                <div >
                    <div className="card-deck" style={{display : "flex",flexDirection : 'row', gap : 50, alignItems : "center", marginTop : 50, marginLeft : 50 }}>
                        {cards.map((card) => (
                            <div style={{  cursor: 'pointer', border : "medium" , borderColor : "blue", width : 200}} onClick={() => {handleCardClick(card.id)}}>
                                <PokemonCard key={card.id}
                                    name={card.name}
                                    imageURL={card.imageUrl}
                                    attack={card.attack}
                                    defense={card.defense}
                                    description={card.description}
                                    isCardChoice={true}
                                    isChoosen={isCardSelected(card.id)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{display : "flex", justifyContent : "center", marginTop : 20}}>
                <Button variant="contained" color="primary" onClick={() => {playAction()}}>Let's play !</Button>
            </div>

        </div>
    </div>
  );
}

export default CardChoiceComponent;