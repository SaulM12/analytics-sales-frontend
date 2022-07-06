import { Alert, Button, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import listStyle from './shoppingList.module.css'
import { getShoppingList, deleteShoppingItem } from '../services/detail';
import { generateSale } from '../services/sales';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send'
function ShoppingList() {
  const [productList, setProductList] = useState([])
  const [userName, setUserName] = useState("")
  const [userMail, setUserMail] = useState("")
  const [showSuccess, setSuccess] = useState(false)
  const [successMessage, setMessage] = useState("")
  const getUserShoppingList = () => {
    getShoppingList({ setProductList, setUserName, setUserMail })
  }
  useEffect(() => {
    getUserShoppingList()
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
    showSuccess(false);
};
  const confirmSale = () => {
    generateSale({userMail}).then(response => {
      localStorage.setItem("number", "0")
      window.dispatchEvent(new Event('storage'))
      setMessage(response.data.message)
      setSuccess(true)
      getShoppingList({ setProductList, setUserName, setUserMail })
    })
  }
  return (
    <div className={listStyle.container}>
      <div className={listStyle.detail__card}>
        <Typography variant="h4" color={'#333333'} fontWeight={500} component="h2">
          Detalle de compra
        </Typography>
        <div className={listStyle.user__info}>
          <TextField
            disabled
            id="outlined-"
            label="Nombre"
            value={userName !== "" && userName}
          />
          <TextField
            disabled
            id="outlined-"
            label="Email"
            value={userMail !== "" && userMail}
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Fecha"
            defaultValue="20-04-2022"
          />
        </div>
        <Stack spacing={0} className={listStyle.products_container}>
          {productList.map((detail, index) =>
            <div className={listStyle.product_card} key={index}>
              <img alt={detail.product.name} src={detail.product.image} className={listStyle.product_image} />
              <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                {detail.product.name}
              </Typography>
              <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                {detail.amount}
              </Typography>
              <Typography variant="p" fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                ${detail.product.price}
              </Typography>
              <Typography variant="p" fontSize={20} fontWeight={700} component="h2">
                ${detail.product.price * detail.amount}
              </Typography>
              <IconButton color="error" aria-label="add to shopping cart" onClick={() => { deleteItem(detail.id) }}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          )}
        </Stack>
        <Button variant="contained" color='success' className={listStyle.confirm} endIcon={<SendIcon />}
        onClick={()=>{
          confirmSale()
        }}>
          Confirmar compra</Button>
      </div>
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" a sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ShoppingList