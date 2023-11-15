import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../store/actions";


function HeaderBox (data : string) {

    const loggedUser = useSelector(selectUser);

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home');
    }

    return (
        <div className="header-box">
            <Box sx={{ flexGrow: 1, borderBottom : 1 }}>
                <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center',justifyContent : 'space-around' }}>
                    <h3>{loggedUser.username} : {loggedUser.money} $</h3>
                    <h2>{data.title}</h2>
                    {data.title == "Store" && <Button variant="contained" color="primary"  onClick={()=> navigateToHome()}>Home</Button>}

                </div>
            </Box>
        </div>
    )
}

export default HeaderBox;