
import { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import listStyle from '../../../styles/addedToCart/shoppingList.module.css'

function PayCard(props) {
    const { userData, productsQuantity, productList, loading, confirmSale } = props;
    const [date, ] = useState(new Date().toLocaleDateString())

    const calculateTotal = (details) => {
        let total = 0
        details.forEach(detail => {
            total = total + (detail.amount * detail.product.price)
        });
        return total
    }
    
    return (
        <Box px={3}>
            <Card>
                <CardContent>
                    <Typography variant="h4" textAlign={'center'} fontWeight={700}>
                        Información de compra
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} mt={4} fontSize={19}>
                        <b>Cliente:</b> {userData.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} fontSize={19}>
                        <b>E-mail:</b> {userData.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} fontSize={19}>
                        <b>Fecha:</b> {date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} fontSize={19}>
                        <b>Cantidad de productos:</b> {productsQuantity}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} fontSize={19}>
                        <b>Total a pagar:</b> ${calculateTotal(productList).toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions>
                    {loading ? <LoadingButton loading variant="contained" className={listStyle.confirm} /> :
                        <Button variant="contained" color='success' className={listStyle.confirm}
                            onClick={() => confirmSale()}>
                            Confirmar compra</Button>
                    }
                </CardActions>
            </Card>
        </Box>
    )
}

export default PayCard;