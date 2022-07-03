import { Button, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import detailStyle from './productDetail.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClassIcon from '@mui/icons-material/Class';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function ProductDetail() {
    const [amount, setAmount] = React.useState(0)
    const add = () => {
        setAmount(amount + 1)
    }
    const subtract = () => {
        setAmount(amount - 1)
    }
    var products = [{ key: 0, name: 'Product 1', cost: 20.00, image: 'https://cdn-icons-png.flaticon.com/512/992/992747.png' },
    { key: 1, name: 'Product 2', cost: 20.00, image: 'https://cdn-icons.flaticon.com/png/512/2745/premium/2745070.png?token=exp=1655605058~hmac=0e2d78823b47daa001cb071a45ed06fd' },
    ]
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={detailStyle.container}>
            <Grid item sm={12} md={6} lg={6}>
                <Stack spacing={2} alignItems="flex-start" textAlign={'left'} justifyContent="center">
                    <Typography variant="h3" fontWeight={700} component="h2" className={detailStyle.main__text}>
                        Producto
                    </Typography>
                    <Typography variant="p" fontWeight={300} component="article" fontSize={18} >
                        Discover local on demand delivery or Pickup from nearby restaurantes
                    </Typography>
                    <div className={detailStyle.image__container}>
                        <img src='https://cdn-icons-png.flaticon.com/512/920/920551.png' className={detailStyle.image}
                            alt='hola' />
                    </div>
                    <div className={detailStyle.desc__container}>
                        <Typography variant="h4" fontWeight={600} component="article" >
                            $25.00
                        </Typography>
                    </div>
                    <div className={detailStyle.desc__container}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={subtract}
                            disabled={amount === 0}>
                            <RemoveIcon />
                        </IconButton>
                        <span className={detailStyle.amount__input}>{amount}</span>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={add}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className={detailStyle.desc__container}>
                        <Button variant="contained">
                            Añadir al carrito
                        </Button>
                    </div>

                </Stack>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={0} sm={0} md={4} lg={4} >
                <div className={detailStyle.side}>
                    <Chip icon={<ClassIcon />} label="Categoria" className={detailStyle.chip} />
                    {
                        products.map(product =>

                            <Stack key={product.id} direction="column" justifyContent="flex-end" alignItems="start" spacing={1} className={detailStyle.second__product__card}>
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
                                            ${product.cost}.00
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
                                <Button variant="contained" component="span"
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