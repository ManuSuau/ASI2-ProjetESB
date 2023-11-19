import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, removeUser, setUser} from "../store/actions";


function HeaderBox (data : string) {

    const loggedUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data.title === "Home") {
            fetch('http://localhost:8080/auths/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: loggedUser.username, password: loggedUser.password}),
            })
                .then(response => response.json())
                .then(data => {
                    const loggedUser = {
                        username: data.username,
                        id: data.id,
                        money: data.money,
                        password: data.password
                    }
                    dispatch(setUser(loggedUser));
                })
        }
    }, [loggedUser]);

    const navigateToHome = () => {
        navigate('/home');
    }

    const username = loggedUser ? loggedUser.username : 'Loading...';
    const money = loggedUser ? loggedUser.money : 0;

    function logout() {
        removeUser();
        navigate('/');
    }

    return (
        <div className="header-box">
            <Box sx={{ flexGrow: 1, borderBottom : 1 }}>
                <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center',justifyContent : 'space-around' }}>
                    <h3>{username} : {money} $</h3>
                    <h2>{data.title}</h2>
                    {data.title === "Store" ? <Button variant="contained" color="primary" onClick={() => navigateToHome()}>Home</Button> :
                        <Button variant="contained" color="primary" onClick={() => logout()}>Logout</Button>}
                </div>
            </Box>
        </div>
    )
}

export default HeaderBox;