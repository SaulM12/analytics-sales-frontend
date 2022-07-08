import { Button, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import detailStyle from './productDetail.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClassIcon from '@mui/icons-material/Class';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProductsByCategory } from '../services/product';
import { addToCart } from '../services/detail';
function ProductDetail() {
    const [amount, setAmount] = React.useState(1)
    var { id } = useParams();
    var { category } = useParams();
    var [relatedProducts, setRelatedProducts] = React.useState([])
    var [product, setProduct] = React.useState(null)

    useEffect(() => {
        let shouldUpdate = true;
        if (shouldUpdate) {
            Promise.all([
                getProductById(id.toString()),
                getRelatedProductsByCategory({ id, category })
            ]).then(results => {
                const [first, second] = results;
                console.log(results);
                setProduct(first)

                setRelatedProducts(second)
            }).catch(error => {
                new Error(error)
            })
        }
        return () => {
            shouldUpdate = false;
        }
    }, [id, setProduct, setRelatedProducts, category])
    const add = () => {
        setAmount(amount + 1)
    }
    const subtract = () => {
        setAmount(amount - 1)
    }
    const addProduct = (amountToAdd, productToAdd) => {
        addToCart({ amountToAdd, productToAdd })
    }
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={detailStyle.container}>
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
                            alt='hola' />
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
                        <Button variant="contained" onClick={() => {
                            addProduct(amount, product)
                        }}>
                            Añadir al carrito
                        </Button>
                    </div>

                </Stack>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={0} sm={0} md={4} lg={4} >
                <div className={detailStyle.side}>
                    <Chip icon={<ClassIcon />} label={product && product.category} className={detailStyle.chip} />
                    {
                        relatedProducts.map(product =>
                            <Stack key={product.name} direction="column" justifyContent="flex-end" alignItems="start" spacing={1} className={detailStyle.second__product__card}>
                                <div className={detailStyle.header__card}>
                                    <Typography variant="p" fontSize={20} fontWeight={500} component="article"  >
                                        {product.name}
                                    </Typography>
                                    <IconButton aria-label="add to shopping cart">
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
                                    addProduct(1, product)
                                }}
                                    className={detailStyle.actions}>
                                    Añadir al carrito
                                </Button>
                            </Stack>
                        )
                    }
                </div>
            </Grid>
        </Grid>
    )
}

export default ProductDetail