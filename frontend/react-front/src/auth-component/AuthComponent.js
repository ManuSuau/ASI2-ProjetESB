//login form

import React, {Component, useEffect, useState} from 'react';
import {Alert, Button, Card, FormGroup, Input, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions';
import {io} from "socket.io-client";

function AuthComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = io('http://localhost:3333');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    let snackbarMessage = "User is being created";

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        socket.connect();
        // Handle events within useEffect
        socket.on('connect', () => {
            console.log('Connected to the WebSocket');
        });
    }, [isLogin]);
    function refreshPage() {
        window.location.reload(false);
    }
    function doAction() {
        if (isLogin === true) {
            //login
             fetch('http://localhost:8080/auths/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username : document.getElementsByName("username")[0].value, password : document.getElementsByName("password")[0].value}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.username == null) {
                        alert("Wrong username or password");
                    }
                    else {
                        const loggedUser = {
                            username: data.username,
                            id: data.id,
                            money: data.money,
                            password: data.password
                        }
                        dispatch(setUser(loggedUser));
                        socket.disconnect()
                        navigate('/home');

                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setOpenSnackBar(true)
            fetch('http://localhost:8080/auths/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username : document.getElementsByName("username")[0].value, password : document.getElementsByName("password")[0].value}),
            })
                .then(response => response.text())
                .then(data => {
                    console.log('Success:', data);

                    socket.on('login', (data) => {
                        snackbarMessage = "User created successfully";
                        console.log(data);
                        setTimeout(() => {
                            refreshPage();
                        }, 2000);
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }




    function handleClose() {
        setOpenSnackBar(false);
    }

    return (
            <Card style={{width : "50%", margin : 'auto'}}>
                <Snackbar   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <FormGroup style={{ padding : 15, gap : 15}}>
                        <h2> {isLogin === true ? "Welcome" : "Create a user"}</h2>
                        <Input type="text" name="username" placeholder="username" />
                        <Input type="password" name="password" placeholder="password" />
                        <Button variant="contained" color="primary" onClick={() => doAction()}>{isLogin === true ? "Login" : "Register"}</Button>
                    {isLogin === true ? <Button variant="contained" color="primary" onClick={() => setIsLogin(false)}>Or register</Button> : null }
                </FormGroup>
            </Card>
    )
}

export default AuthComponent;