
import React from 'react'
import { Button, Chip, Divider, Grid, IconButton,  Stack, Typography } from '@mui/material'
import detailStyle from '../../../styles/productDetail/productDetail.module.css'
import ClassIcon from '@mui/icons-material/Class';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function RelatedProducts({ relatedProducts, addProductToCart, category }) {

    return (
        <Grid item xs={0} sm={0} md={4} lg={4} >
            <div className={detailStyle.side}>
                <Chip icon={<ClassIcon />} label={category} className={detailStyle.chip} />
                {
                    relatedProducts.map(product =>
                        <Stack key={product.name} direction="column" justifyContent="flex-end" alignItems="start"
                            spacing={1} className={detailStyle.second__product__card}>
                            <div className={detailStyle.header__card}>
                                <Typography variant="p" fontSize={20} fontWeight={500} component="article"  >
                                    {product.name}
                                </Typography>
                                <IconButton aria-label="add to shopping cart"
                                    href={'/store/detail/' + product.id + '/' + product.category}>
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </div>
                            <div className={detailStyle.header__card}>
                                <Stack spacing={2} alignItems="center" justifyContent="center">
                                    <Typography variant="h1" fontSize={35} fontWeight={500} component="article" >
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="p" fontSize={20} fontWeight={300} component="article" >
                                        Producto Relacionado
                                    </Typography>
                                </Stack>
                                <div className={detailStyle.product__image__container}>
                                    <img alt='sd' src={product.image}
                                        className={detailStyle.product__image}>
                                    </img>
                                </div>
                            </div>
                            <Divider flexItem />
                            <Button variant="contained" component="span" onClick={() => {
                                addProductToCart(1, product)
                            }}
                                className={detailStyle.actions}>
                                Añadir al carrito
                            </Button>
                        </Stack>
                    )
                }
            </div>
        </Grid>
    )
}

export default RelatedProducts;