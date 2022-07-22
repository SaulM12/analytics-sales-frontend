import React, { useEffect, useState } from 'react';
import homeStyles from '../../../styles/home/home.module.css'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductsByCategory(props) {
    const { productsCategoryOne, productsCategoryTwo, addProductToCart, category } = props;
    const [products, setProducts] = useState([])

    useEffect(() => {
        let shouldUpdate = true;
        shouldUpdate && category === 'Ropa' ? setProducts(productsCategoryOne) : setProducts(productsCategoryTwo)
        return () => {
            shouldUpdate = false;
        }
    }, [category, productsCategoryTwo, productsCategoryOne])

    return (
        <div className={homeStyles.product__list}>
            <Typography variant="h5" fontWeight={600} component="h2" className={homeStyles.main__text}>
                Productos de {category}
            </Typography>
            <Grid container spacing={2}>
                {
                    products.map(product =>
                        <Grid item xs={12} md={3} lg={3} justifyContent='center' key={product.id} style={{ position: 'relative' }}>
                            <IconButton color="primary" aria-label="add to shopping cart"
                                className={homeStyles.add__button__second}
                                onClick={() => addProductToCart(1, product)}>
                                <AddShoppingCartIcon />
                            </IconButton>
                            <a href={'/store/detail/' + product.id + '/' + product.category} className={homeStyles.second__product__card} >
                                <Stack direction="column" justifyContent="start" alignItems="center" spacing={1}>
                                    <div className={homeStyles.product__image__container}>
                                        <img alt='sd' src={product.image}
                                            className={homeStyles.product__image} onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                                            }}>
                                        </img>
                                    </div>
                                    <Typography variant="p" fontSize={24} fontWeight={600} component="article"  >
                                        {product.name}
                                    </Typography>
                                    <div>
                                        <Typography variant="p" fontSize={22} fontWeight={500} component="article" >
                                            ${product.price.toFixed(2)}
                                        </Typography>
                                    </div>
                                </Stack>
                            </a>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default ProductsByCategory;