import React, { useState } from 'react'
import { Button,  Grid, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import detailStyle from '../../../styles/productDetail/productDetail.module.css'
function Product({ product, addProductToCart }) {

    const [amount, setAmount] = useState(1)
    const add = () => {
        setAmount(amount + 1)
    }
    const subtract = () => {
        setAmount(amount - 1)
    }

    return (
        <Grid item sm={12} md={6} lg={6}>
            <Stack spacing={2} alignItems="flex-start" textAlign={'left'} justifyContent="center">
                <Typography variant="h3" fontWeight={700} component="h2" className={detailStyle.main__text}>
                    {product && product.name}
                </Typography>
                <Typography variant="p" fontWeight={300} component="article" fontSize={18} >
                    {product && product.description}
                </Typography>
                <div className={detailStyle.image__container}>
                    <img src={product && product.image} className={detailStyle.image}
                        alt='hola' onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                        }}/>
                </div>
                <div className={detailStyle.desc__container}>
                    <Typography variant="h4" fontWeight={600} component="article" >
                        ${product && product.price.toFixed(2)}
                    </Typography>
                </div>
                <div className={detailStyle.desc__container}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={subtract}
                        disabled={amount === 1}>
                        <RemoveIcon />
                    </IconButton>
                    <span className={detailStyle.amount__input}>{amount}</span>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={add}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div className={detailStyle.desc__container}>
                    <Button variant="contained" onClick={() => addProductToCart(amount, product)}>
                        Añadir al carrito
                    </Button>
                </div>

            </Stack>
        </Grid>
    )
}

export default Product;