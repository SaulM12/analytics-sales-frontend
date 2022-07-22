import { Badge, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import { getUserDetails, logout } from '../services/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
function Header() {
  let navigate = useNavigate()
  let [userName, setUserName] = useState("")
  let [userId, setUserId] = useState("")
  let [number, setNumber] = useState(0);
  const getUserInfo = () => {
    const item = localStorage.getItem('number')
    console.log(localStorage.getItem('number'));
    if (item) {
      setNumber(parseInt(item))
    }
  }
  useEffect(() => {
    getUserDetails({ setUserName, setUserId })
    let shouldUpdate = true;
    if (shouldUpdate) {
      getUserInfo()
    }
    window.addEventListener('storage', getUserInfo)
    return () => {
      shouldUpdate = false;
    }
  }, [number]);

  const closeSession = () => {
    logout({ navigate })
  }

  const seeDetail = () => { navigate("/store/shopping/" + userId, { replace: false }) }

  const goToMyPurchases = () => { navigate("/store/myPurchases", { replace: false }) }
  return (
    <Grid container direction="row" className={headerStyles.container} p={2}>
      <Grid item xs={7} md={6} className={headerStyles.gridContainer} pl={3}>
        <Typography variant="h4" fontWeight={600} component="h1" >
          <a href='/store' className={headerStyles.a}>Store™</a>
        </Typography>
      </Grid>
      <Grid item xs={5} md={6} className={headerStyles.gridContainer}>
        <div className={headerStyles.user__container}>
          <Button variant="text" color='success' onClick={goToMyPurchases} endIcon={<ShoppingBagIcon />} className={headerStyles.client__button}>
            {userName}
          </Button>
          <IconButton color="primary" aria-label="add an alarm" onClick={seeDetail} className={headerStyles.client__button}>
            <Badge badgeContent={number} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="close session" color="error" onClick={closeSession}>
            <LogoutIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}

export default Header