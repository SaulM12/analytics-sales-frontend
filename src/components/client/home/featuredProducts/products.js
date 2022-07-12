import { Button, Grid, IconButton, Stack, Typography} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LabelIcon from '@mui/icons-material/Label';
import homeStyles from '../../../styles/home/home.module.css'


function Products(props) {
    const { addProductToCart, productsLessPrice, index, prevProduct, nextProduct } = props;
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className={homeStyles.banner}>
            <Grid item sm={4} md={8} lg={4}>
                <Stack spacing={2} alignItems="flex-start" textAlign={'left'} justifyContent="center">
                    <Typography variant="h2" fontWeight={700} component="h2" className={homeStyles.main__text}>
                        Productos destacados
                    </Typography>
                    <Typography variant="h4" fontWeight={400} component="article" >
                        {productsLessPrice.length && productsLessPrice[index].name}
                    </Typography>
                    <Button variant="contained" onClick={() => {
                        addProductToCart(1, productsLessPrice[index])
                    }}>
                        Añadir al carrito</Button>
                </Stack>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
                <div className={homeStyles.image__container}>
                    <img src={productsLessPrice.length && productsLessPrice[index].image} className={homeStyles.image}
                        alt='hola' />
                </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={3}>
                <div className={homeStyles.card__container}>
                    <div className={homeStyles.card}>
                        <div className={homeStyles.price}>
                            <Typography variant="p" fontWeight={400} component="article" >
                                Detalles
                            </Typography>
                            <Typography variant="h3" fontWeight={600} component="article" className={homeStyles.main__text}>
                                ${productsLessPrice.length && productsLessPrice[index].price.toFixed(2)}
                            </Typography>
                            <Typography variant="h5" fontWeight={500} component="article" >
                                <LabelIcon />{productsLessPrice.length && productsLessPrice[index].category}
                            </Typography>
                        </div>
                        <div className={homeStyles.card__action}>
                            <IconButton color="primary" aria-label="add an alarm"
                                onClick={prevProduct} disabled={index === 0}>
                                <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="add to shopping cart"
                                onClick={nextProduct} disabled={index === 5}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Products