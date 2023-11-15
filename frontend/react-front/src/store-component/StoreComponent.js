//store
import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../utilities/header";
import PokemonCard from "../utilities/pokemonCard";


function StoreComponent (data : string) {

    const [cards, setCards] = React.useState([]);
    const [isBuy, setIsBuy] = React.useState(data.data === "buy");
    const id = localStorage.getItem('id');
    const [selectedRow, setSelectedRow] = useState(null);

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

    const userId = localStorage.getItem('id');
    const money = localStorage.getItem('money');

    useEffect(() => {
        fetchData(data.data, id).then(r => console.log(r));
    }, []);


    const handleRowClick = (row) => {
        setSelectedRow(row);
        // You can perform additional actions on row selection if needed
    };
    async function BuyAction() {
        try {
            if (money < selectedRow.prix) {
                alert("You don't have enough money")
                return;
            }
            let url = `http://localhost:8082/store/buy?card_id=${selectedRow.id}&user_id=${userId}`;
            const response = await fetch(url);
            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function SellAction() {
        try {
            let url = `http://localhost:8082/store/sell?card_id=${selectedRow.id}`;
            const response = await fetch(url);
            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
            <div>
                <HeaderBox title={"Store"}/>
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
                                    <TableCell>On sale</TableCell>
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
                                          <TableCell>{val.ownerid == 0 ? 'Yes' : 'No'}</TableCell>
                                   </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="table" style={{ width: "20%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }


export default StoreComponent;