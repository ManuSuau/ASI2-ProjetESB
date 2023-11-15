//login form

import React, {Component, useState} from 'react';
import {Button, Card, FormGroup, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";

function AuthComponent() {
    const navigate = useNavigate();

    const navigateHome = () => {
        // Navigate to the specified route
        navigate('/home');
    };
    const [isLogin, setIsLogin] = useState(true);


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
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("username", data.username);
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("money", data.money);
                        navigateHome();
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            //register
            fetch('http://localhost:8080/auths/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username : document.getElementsByName("username")[0].value, password : document.getElementsByName("password")[0].value}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("id", data.id);
                    localStorage.setItem("money", data.money);
                    navigateHome();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
            <Card style={{width : "50%", margin : 'auto'}}>
                <FormGroup style={{ padding : 15, gap : 15}}>
                        <h2> {isLogin === true ? "Welcome" : "Create a user"}</h2>
                        <Input type="text" name="username" placeholder="username" />
                        <Input type="password" name="password" placeholder="password" />
                        <Button variant="contained" color="primary" onClick={() => doAction()}>{isLogin === true ? "Login" : "Register"}</Button>
                    {isLogin === true ? <Button variant="contained" color="primary" onClick={() => setIsLogin(false)}>Or register</Button> : null }
                </FormGroup>
            </Card>        )
}

export default AuthComponent;