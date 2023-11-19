//store
import React, {Component, useEffect, useState} from 'react';
import {Alert, Button, Card, Snackbar, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../utilities/header";
import PokemonCard from "../utilities/pokemonCard";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../store/actions";
import {io} from "socket.io-client";

function StoreComponent (data : string) {
    const socket = io('http://localhost:3333');
    const [cards, setCards] = React.useState([]);
    const [isBuy, setIsBuy] = React.useState(data.data === "buy");
    const [selectedRow, setSelectedRow] = useState(null);
    const [isActionDone, setIsActionDone] = useState(false);
    const dispatch = useDispatch();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const loggedUser = useSelector(selectUser);
    const navigate = useNavigate();

    const fetchData = async (action, ownerId) => {
        try {
            let url = `http://localhost:8081/cards/owner?owner_id=${ownerId}`;
            console.log(action)
            if (isBuy) {
                url = 'http://localhost:8081/cards/owner?owner_id=0';
            }
            const response = await fetch(url);
            const data = await response.json();
            setCards(data);
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
        fetchData(data.data,loggedUser.id).then(r => console.log(r));

    }, []);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        // You can perform additional actions on row selection if needed
    };
    function BuyAction() {
        try {
            if (loggedUser.money < selectedRow.prix) {
                alert("You don't have enough money")
                return;
            }
            //dispatch(reduceMoney(selectedRow.prix));
            //loggedUser.money -= selectedRow.prix;
            let url = `http://localhost:8082/store/buy?card_id=${selectedRow.id}&user_id=${loggedUser.id}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.text()).then(r => {
                setIsActionDone(true);
                socket.on('transaction', (data) => {
                    console.log(data);
                    if (data.finished) {
                        setOpenSnackBar(true);
                    }
                    setTimeout(() => {
                        navigate('/home');
                    }, 3000);
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    function SellAction() {
        try {
            //dispatch(reduceMoney(-selectedRow.prix));
           // loggedUser.money += selectedRow.prix;
            let url = `http://localhost:8082/store/sell?card_id=${selectedRow.id}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.text()).then(r => {
                setIsActionDone(true);
                })
            socket.on('transaction', (data) => {
                console.log(data);
                if (data.finished) {
                    setOpenSnackBar(true);
                }
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleClose() {
        setOpenSnackBar(false);
        navigator.navigate('/home');
    }

    return (
        <div>
            <HeaderBox title={"Store"}/>
            <Snackbar   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                   Transaction completed with success
                </Alert>
            </Snackbar>
            <div style={{display : 'flex', flexDirection : 'row',}}>
                <div className="table" style={{width : "60%" , margin: 10,  overflow: 'auto'}}>
                    <Table sx={{ minWidth: 600, }} size="small" aria-label="a dense table">
                        <TableHead style={{ background: '#2196F3', color: 'white' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Attack</TableCell>
                                <TableCell>Defense</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {cards.map((val, key) => {
                                return (

                                    <TableRow key={val.name}    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        cursor: 'pointer',
                                        backgroundColor: selectedRow === val ? '#e0e0e0' : 'inherit',
                                    }}
                                              onClick={() => handleRowClick(val)}
                                    >
                                        <TableCell>{val.name}</TableCell>
                                        <TableCell>{val.description}</TableCell>
                                        <TableCell>{val.attack}</TableCell>
                                        <TableCell>{val.defense}</TableCell>
                                        <TableCell>{val.prix}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className="table" style={{ width: "20%", display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft : "10%", marginTop : "5%" }}>
                    {selectedRow && (
                        <div>
                            <PokemonCard
                                name={selectedRow.name}
                                attack={selectedRow.attack}
                                defense={selectedRow.defense}
                                isBuy={isBuy}
                                description={selectedRow.description}
                                imageURL={selectedRow.imageUrl}
                                prix={selectedRow.prix}
                                buyAction={BuyAction}
                                sellAction={SellAction}
                                isActionDone={isActionDone}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default StoreComponent;