//home
import React, {Component, useEffect} from 'react';
import Box from "@mui/material/Box";
import {Button, Card, Icon, } from "@mui/material";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../utilities/header";
import {selectUser, setUser} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


function HomeComponent (props : any) {

    const navigate = useNavigate();
    const loggedUser = useSelector(selectUser);
    const dispatch = useDispatch();



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
                <div style={{ display: 'flex', flexDirection: 'row', height: '80vh' }}>
                    <Button
                        style={{  flex: 1, margin :10}}
                        size='large'
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleBuy}
                    >
                        Buy
                    </Button>
                    <div  style={{  flex: 1,display: 'flex', flexDirection: 'column',margin :10}}>
                        <Button
                            style={{  flex: 1,marginBottom : 10}}
                            size='large'
                            variant="contained"
                            color="primary"
                            startIcon={<MonetizationOnIcon />}
                            onClick={handleSell}
                        >
                            Sell
                        </Button>
                        <Button
                            style={{  flex: 1,}}
                            size='large'
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                        >
                            Play
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

export default HomeComponent;