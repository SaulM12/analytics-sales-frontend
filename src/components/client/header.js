import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import headerStyles from './header.module.css'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
function Header() {
  return (
    <div className={headerStyles.container}>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end" >
        <Grid item xs={12} md={2}>
          <div className={headerStyles.logo__container}>
            <Typography variant="h5" fontWeight={600} component="h1" >
              Store™
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8} md={8}>
          <nav className={headerStyles.actions__container}>
           
          </nav>
        </Grid>
        <Grid item xs={4} md={2}>
          <div className={headerStyles.user__container}>
            <IconButton color="primary" aria-label="add an alarm">
              <LocalGroceryStoreOutlinedIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header