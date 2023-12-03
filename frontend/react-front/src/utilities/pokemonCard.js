import {Button, Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";

const PokemonCard = ({ name, attack, defense, description, imageURL, prix ,isBuy, buyAction, sellAction, isActionDone, isCardChoice, isChoosen, isGame, isChoosenForAttack}) => {
    return (
        <Card style={isChoosen ? {backgroundColor :" lightblue"} : isChoosenForAttack ? {backgroundColor :" #ffc6c4"} : defense <= 0 ? {backgroundColor :" #gray"} : null }>
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
                {!isCardChoice || isGame &&<Typography variant="body2" color="text.secondary">
                    Prix: {prix}
                </Typography>}
                {!isGame && <Typography variant="body2" color="text.secondary">
                    Description: {description}
                </Typography>}
            </CardContent>
            <Divider />
            {isCardChoice || isGame ? <></> :
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', flexDirection : "column" }}>
                <Button variant="contained" disabled={isActionDone} color="primary" onClick={() => (isBuy ? buyAction() : sellAction())}>
                    {isBuy ? 'Buy' : 'Sell'}
                </Button>
                <h4 style={{display : isActionDone ? "flex" : "none"}}>{isActionDone ? isBuy ? 'Achat de la carte en cours...' : 'Vente de la carte en cours...' : ''}</h4>
            </div>}
        </Card>
    );
};

export default PokemonCard;