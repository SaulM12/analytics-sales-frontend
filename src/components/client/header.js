import { Badge, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import { getUserDetails } from '../services/auth';
import { logout } from '../services/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header() {
  var navigate = useNavigate()
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
      <Grid item xs={8} md={6} className={headerStyles.gridContainer} pl={3}>
        <Typography variant="h4" fontWeight={600} component="h1" >
          <a href='/store' className={headerStyles.a}>Store™</a>
        </Typography>
      </Grid>

      <Grid item xs={4} md={6} className={headerStyles.gridContainer}>
        <div className={headerStyles.user__container}>
          <Stack direction={'row'} alignItems={'center'} mr={2}>
            <AccountCircleIcon />
            <Typography variant="h5" fontWeight={500} component="h1"  >
              {userName}
            </Typography>
          </Stack>
          <Typography className={headerStyles.myPurchases} mr={2} variant="h5" fontWeight={500} onClick={goToMyPurchases} >
            Mis compras
          </Typography>
          <Stack mr={2}>
            <IconButton color="primary" aria-label="add an alarm" onClick={seeDetail}>
              <Badge badgeContent={number} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
          <IconButton aria-label="close session" color="error" onClick={closeSession}>
            <LogoutIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}

export default Header