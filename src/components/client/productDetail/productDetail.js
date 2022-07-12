import React, { useEffect } from 'react'
import { Alert, Divider, Grid, Snackbar } from '@mui/material'
import detailStyle from '../../styles/productDetail/productDetail.module.css'
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProductsByCategory } from '../../services/product';
import { addToCart } from '../../services/detail';
import Product from './product/product';
import RelatedProducts from './relatedProducts/relatedProducts';
function ProductDetail() {
    var { id, category } = useParams();
    var [relatedProducts, setRelatedProducts] = React.useState([])
    var [product, setProduct] = React.useState(null)
    const [showConfirm, setShowConfirm] = React.useState(false)
    useEffect(() => {
        let shouldUpdate = true;
        if (shouldUpdate) {
            Promise.all([
                getProductById(id.toString()),
                getRelatedProductsByCategory({ id, category })
            ]).then(results => {
                const [first, second] = results;
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


    const addProductToCart = (amountToAdd, productToAdd) => {
        addToCart({ amountToAdd, productToAdd, setShowConfirm })
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowConfirm(false);
    };

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start"
            className={detailStyle.container}>
            <Product addProductToCart={addProductToCart} product={product} />
            <Divider orientation="vertical" flexItem />
            <RelatedProducts addProductToCart={addProductToCart}
                relatedProducts={relatedProducts} category={category} />
            <Snackbar open={showConfirm} autoHideDuration={1500} onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Producto añadido
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default ProductDetail