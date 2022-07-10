import { Badge, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import { getUserDetails } from '../services/auth';
import { logout } from '../services/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
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
  return (
    <div className={headerStyles.container}>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end" >
        <Grid item xs={8} md={10}>
          <div className={headerStyles.logo__container}>
            <Typography variant="h4" fontWeight={600} component="h1" >
              <a href='/store' className={headerStyles.a}>Store™</a>
            </Typography>

          </div>
        </Grid>

        <Grid item xs={4} md={2}>
          <div className={headerStyles.user__container}>
            <AssignmentIndIcon />
            <Typography variant="h5" fontWeight={500} component="h1"  >
              {userName}
            </Typography>
            <IconButton color="primary" aria-label="add an alarm" onClick={seeDetail}>
              <Badge badgeContent={number} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="close session" color="secondary" onClick={closeSession}>
              <LogoutIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header