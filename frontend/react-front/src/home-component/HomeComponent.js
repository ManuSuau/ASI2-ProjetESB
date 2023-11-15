//home
import React, { Component } from 'react';
import Box from "@mui/material/Box";
import {Button, Card, Icon} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../utilities/header";

function HomeComponent (props : any) {

    const navigate = useNavigate();

    const handleBuy = () => {
        navigate('/buy');
    }

    const handleSell = () => {
        navigate('/sell');
    }

    //get user data from local storage

        return (
            <div>
                <HeaderBox title={"Home"}/>
                <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center',justifyContent : 'space-around', height : '80vh' }}>
                    <Card>
                        <Button size='large' variant="contained" color="primary" onClick={handleBuy}>Buy</Button>
                    </Card>
                    <Card>
                        <Button size='large' variant="contained" color="primary" onClick={handleSell}>Sell</Button>
                    </Card>
                    <Card>
                        <Button size='large' variant="contained" color="primary">Play</Button>
                    </Card>
                </div>
            </div>
        );
    }

export default HomeComponent;