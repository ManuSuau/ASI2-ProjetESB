//login form

import React, {Component, useState} from 'react';
import {Button, Card, FormGroup, Input} from "@mui/material";

function AuthComponent() {

    const [isLogin, setIsLogin] = useState(true);


        return (
            <Card style={{width : "50%", margin : 'auto'}}>
                <FormGroup style={{ padding : 15, gap : 15}}>
                        <h2> {isLogin === true ? "Welcome" : "Create a user"}</h2>
                        <Input type="text" name="username" placeholder="username" />
                        <Input type="password" name="password" placeholder="password" />
                        <Button variant="contained" color="primary" >{isLogin === true ? "Login" : "Register"}</Button>
                    {isLogin === true ? <Button variant="contained" color="primary" onClick={() => setIsLogin(false)}>Or register</Button> : null }
                </FormGroup>
            </Card>        )
}

export default AuthComponent;