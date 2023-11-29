import {useSelector} from "react-redux";
import HeaderBox from "../utilities/header";
import React, {useEffect, useState} from "react";
import PokemonCard from "../utilities/pokemonCard";
import {Alert, Snackbar} from "@mui/material";

function CardChoiceComponent() {
  const user = useSelector(state => state.user);
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    let message = "You can only choose 3 cards";
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

    useEffect(() => {
        fetchData(user.id).then(r => console.log(r));
    }, []);

    // return a page with the user's cards using the CardComponent making it clickable and let them choose 3 to play with


    function handleCardClick(id) {
        if (selectedCards.length < 3 && !selectedCards.includes(id)) {
            setSelectedCards([...selectedCards, id]);
        } else {
            openSnackBar();
        }
    }

    function handleClose() {
        setOpenSnackBar(false);
    }

    return (
    <div>
        <Snackbar   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <HeaderBox title={"Home"}/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Choose your cards</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card-deck" style={{flexDirection : 'row', gap : 20}}>
                        {cards.map((card) => (
                            <div style={{  cursor: 'pointer'}} onClick={() => {handleCardClick(card.id)}}>
                                <PokemonCard key={card.id} card={card}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}