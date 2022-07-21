import { Alert, Button, Grid, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import listStyle from './shoppingList.module.css'
import { getShoppingList, deleteShoppingItem } from '../services/detail';
import { generateSale, getSalesByClient } from '../services/sales';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LoadingButton from '@mui/lab/LoadingButton';
function ShoppingList() {
  const [productList, setProductList] = useState([])
  const [userName, setUserName] = useState("")
  const [userMail, setUserMail] = useState("")
  const [showSuccess, setSuccess] = useState(false)
  const [successMessage, setMessage] = useState("")
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(false)
  const getUserShoppingList = () => {
    getShoppingList({ setProductList, setUserName, setUserMail })
  }
  const getPurchases = () => {
    getSalesByClient().then(list => {
      setPurchases(list)
    })
  }
  useEffect(() => {
    getUserShoppingList()
    getPurchases()
  }, []);

  const deleteItem = (itemId) => {
    deleteShoppingItem({ itemId }).then(() => {
      let number = parseInt(localStorage.getItem("number")) - 1
      localStorage.setItem("number", number.toString())
      window.dispatchEvent(new Event('storage'))
      getShoppingList({ setProductList, setUserName, setUserMail })
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };
  const confirmSale = () => {
    setLoading(true)
    generateSale({ userMail }).then(response => {
      localStorage.setItem("number", "0")
      window.dispatchEvent(new Event('storage'))
      setMessage(response.data.message)
      setLoading(false)
      setSuccess(true)
      getShoppingList({ setProductList, setUserName, setUserMail })
      getPurchases()
    })
  }
  const calculateTotal = (details) => {
    let total = 0
    details.forEach(detail => {
      total = total + (detail.amount * detail.product.price)
    });
    return total
  }
  const handleLoginButton = () => {
    return (
      loading ? <LoadingButton loading variant="contained" className={listStyle.confirm}/>:
        <Button variant="contained" color='success' className={listStyle.confirm} endIcon={<SendIcon />}
          onClick={() => {
            confirmSale()
          }}>
          Confirmar compra</Button>
    )
  }
  return (
    <div className={listStyle.container}>
      <Grid container spacing={2} >
        <Grid item xs={8} md={9} className={listStyle.detail__card}>
          <Typography variant="h4" color={'#333333'} fontWeight={500} component="h2">
            Detalle de compra
          </Typography>
          <div className={listStyle.user__info}>
            <TextField className={listStyle.field}
              disabled
              id="outlined-"
              label="Nombre"
              value={userName !== "" && userName}
            />
            <TextField className={listStyle.field}
              disabled
              id="outlined-"
              label="Email"
              value={userMail !== "" && userMail}
            />
            <TextField className={listStyle.field}
              disabled
              id="outlined-disabled"
              label="Fecha"
              value={new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}
            />
          </div>
          <Stack spacing={0} className={listStyle.products_container}>
            {productList.map((detail, index) =>
              <Grid container spacing={2} className={listStyle.product_card} key={index}>
                <Grid item xs={3} md={2} >
                  <img alt={detail.product.name} src={detail.product.image} className={listStyle.product_image} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                    {detail.product.name}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                    {detail.amount}
                  </Typography>
                </Grid>
                <Grid item xs={3} md={2}>
                  <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                    ${detail.product.price}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="p" fontSize={20} fontWeight={700} component="h2">
                    ${(detail.product.price * detail.amount).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <IconButton color="error" aria-label="add to shopping cart" onClick={() => { deleteItem(detail.id) }}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Stack>
          {productList.length ?
            <div className={listStyle.confirm_container}>
              <Typography variant="p" fontSize={20} color={'black'} fontWeight={600} component="h2">
                Total a pagar: ${calculateTotal(productList).toFixed(2)}
              </Typography>
              {handleLoginButton()}
            </div>
            :
            <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
              Aun no has añadido ningún producto.
            </Typography>
          }
        </Grid>
        <Grid item xs={4} md={3} >
          <div className={listStyle.purchases}>
            <Typography variant="h5" color={'#333333'} fontWeight={600} component="h2">
              Compras previas
            </Typography>
          </div>
          <div className={listStyle.previous__container}>
            {purchases.length ? null : <Typography variant="p" color={'#333333'} fontWeight={400} component="p">
              Realiza tu primera compra
            </Typography>}
            {purchases.map((purchase, index) =>
              <div className={listStyle.previous__purchases} key={index} >
                <div className={listStyle.item__purchases}>
                  <Typography variant="h5" color={'#333333'} fontWeight={600} component="h2">
                    ${purchase.total.toFixed(2)}
                  </Typography>
                  <ShoppingBasketIcon sx={{ fontSize: 35, marginLeft: 1 }} color="success" />
                </div>
                <div className={listStyle.item__purchases}>
                  <Typography variant="h6" color={'#333333'} fontWeight={500} component="h2">
                    Fecha: {new Date(purchase.date).getDate() + "/" + new Date(purchase.date).getMonth() + "/" + new Date(purchase.date).getFullYear()}
                  </Typography>
                </div>
              </div>)}
          </div>
        </Grid>
      </Grid>
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" a sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ShoppingList