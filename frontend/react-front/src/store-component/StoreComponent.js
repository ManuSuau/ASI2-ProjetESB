//store
import React, { Component } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";


class StoreComponent extends Component {
    data =[{
        "name": "Bulbasaur",
        "description": "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        "family": "Seed",
        "affinity": "Grass",
        "energy": 1,
        "hp": 1,
        "price": 100
    },
        {
            "name": "Ivysaur",
            "description": "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
            "family": "Seed",
            "affinity": "Grass",
            "energy": 2,
            "hp": 2,
            "price": 200
        }];
    render() {
        return (
            <div>
                <h2>Store</h2>
                <div className="table" style={{width : "80vh"}}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Family</TableCell>
                                <TableCell>Affinity</TableCell>
                                <TableCell>Energy</TableCell>
                                <TableCell>HP</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        {this.data.map((val, key) => {
                            return (
                               <TableRow key={val.name}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <TableCell>{val.name}</TableCell>
                                      <TableCell>{val.description}</TableCell>
                                      <TableCell>{val.family}</TableCell>
                                      <TableCell>{val.affinity}</TableCell>
                                      <TableCell>{val.energy}</TableCell>
                                      <TableCell>{val.hp}</TableCell>
                                      <TableCell>{val.price}</TableCell>
                               </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default StoreComponent;