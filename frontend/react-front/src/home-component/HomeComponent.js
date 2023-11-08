//home
import React, { Component } from 'react';
import Box from "@mui/material/Box";
import {Button, Card, Icon} from "@mui/material";

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <Box sx={{ flexGrow: 1, borderBottom : 1 }}>
                    <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center',justifyContent : 'space-around' }}>
                        <h3>5000 $</h3>
                        <h2>Home</h2>
                        <Button variant="contained" color="primary" startIcon={<Icon></Icon>}>Max Dupont</Button>
                    </div>
                </Box>
                <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center',justifyContent : 'space-around', height : '80vh' }}>
                    <Card>
                        <Button size='large' variant="contained" color="primary">Buy</Button>
                    </Card>
                    <Card>
                        <Button size='large' variant="contained" color="primary">Sell</Button>
                    </Card>
                    <Card>
                        <Button size='large' variant="contained" color="primary">Play</Button>
                    </Card>
                </div>
            </div>
        );
    }
}

export default HomeComponent;