import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import listStyle from '../../styles/addedToCart/shoppingList.module.css'
import { getShoppingList } from '../../services/detail';
import { generateSale } from '../../services/sales';
import ProductsList from './productList/productsList';
import PayCard from './payInfoCard/payCard';
function ShoppingList() {
  const [productList, setProductList] = useState([])
  const [showAlert, setShowAlert] = useState({ info: '', type: 'error', show: false })
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [userData, setUserData] = useState({ name: '', email: '' })
  const getUserShoppingList = () => {
    getShoppingList({ setProductList, setUserData })
  }

  useEffect(() => {
    getUserShoppingList()
    setRefresh(false)
  }, [refresh]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert({ show: false })
  };

  const confirmSale = () => {
    if (productList.length) {
      setLoading(true)
      let email = userData.email
      generateSale(email).then(response => {
        localStorage.setItem("number", "0")
        window.dispatchEvent(new Event('storage'))
        setShowAlert({ info: response.data.message, type: 'success', show: true })
        setLoading(false)
      }).finally(() => {
        setRefresh(true)
      })
    } else {
      setShowAlert({ info: 'No tienes productos para comprar', type: 'error', show: true })
    }
  }


  return (
    <div className={listStyle.container}>
      <Grid container>
        <Grid item xs={8} md={9} className={listStyle.detail__card}>
          <Typography variant="h4" color={'#333333'} fontWeight={500} component="h2">
            Mi carrito de compras
          </Typography>
          <ProductsList seeDetail={false} productList={productList} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={4} md={3}  >
          <PayCard productList={productList} userData={userData}
            productsQuantity={productList.length} loading={loading} confirmSale={confirmSale} />
        </Grid>
      </Grid>
      <Snackbar open={showAlert.show} autoHideDuration={1500} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity={showAlert.type} sx={{ width: '100%' }}>
          {showAlert.info}
        </Alert>
      </Snackbar>
    </div >
  )
}

export default ShoppingList