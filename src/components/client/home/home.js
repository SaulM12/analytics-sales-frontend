import React, { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import homeStyles from '../../styles/home/home.module.css'
import { getProductsOrderByLessPrice, getProductsByCategory } from '../../services/product';
import { addToCart } from '../../services/detail';
import FeaturedProducts from './featuredProducts/featuredProducts';
import "swiper/css/bundle";
function Home() {
  const [productsLessPrice, setProductsLessPrice] = useState([])
  const [productsCategoryOne, setProductsCategoryOne] = useState([])
  const [productsCategoryTwo, setProductsCategoryTwo] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  useEffect(() => {
    let shouldUpdate = true;
    if (shouldUpdate) {
      Promise.all([
        getProductsOrderByLessPrice(),
        getProductsByCategory("Ropa"),
        getProductsByCategory("Tecnología")
      ]).then(results => {
        const [first, second, third] = results;
        setProductsLessPrice(first)
        setProductsCategoryOne(second)
        setProductsCategoryTwo(third)
      }).catch(error => {
        new Error(error)
      })
    }
    return () => {
      shouldUpdate = false;
    }
  }, [])

  const addProductToCart = (amountToAdd, productToAdd) => {
    addToCart({ amountToAdd, productToAdd, setShowConfirm })
  }
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowConfirm(false);
  };

  return (
    <div className={homeStyles.container}>
      <FeaturedProducts addProductToCart={addProductToCart} productsLessPrice={productsLessPrice}
        productsCategoryOne={productsCategoryOne} productsCategoryTwo={productsCategoryTwo} />
      <Snackbar open={showConfirm} autoHideDuration={1500} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Producto añadido
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Home