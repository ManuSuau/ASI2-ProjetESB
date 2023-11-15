import {Button, Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";

const PokemonCard = ({ name, attack, defense, description, imageURL, prix ,isBuy, buyAction, sellAction}) => {
    return (
        <Card>
            <CardMedia component="img" height="140" image={imageURL} alt={name} />
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Attack: {attack}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Defense: {defense}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Prix: {prix}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {description}
                </Typography>
            </CardContent>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <Button variant="contained" color="primary" onClick={() => (isBuy ? buyAction() : sellAction())}>
                    {isBuy ? 'Buy' : 'Sell'}
                </Button>
            </div>
        </Card>
    );
};

export default PokemonCard;