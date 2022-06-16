import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import homeStyles from './home.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LabelIcon from '@mui/icons-material/Label';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//const swiper = document.querySelector('.swiper').swiper;
function home() {
  //swiper.slideNext();
  return (
    <div className={homeStyles.container}>
      <Grid container direction="row" justifyContent="center" alignItems="center" className={homeStyles.banner}>
        <Grid item sm={4} md={8} lg={4}>
          <Stack spacing={2} alignItems="flex-start" textAlign={'left'} justifyContent="center">
            <Typography variant="h2" fontWeight={700} component="h2" className={homeStyles.main__text}>
              Smothies to make your day smooth
            </Typography>
            <Typography variant="p" fontWeight={400} component="article" >
              Discover local on demand delivery or Pickup from nearby restaurantes
            </Typography>
            <Button variant="contained">Añadir al carrito</Button>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <div className={homeStyles.image__container}>
            <img src='https://imcbusiness.com/public/product/health-nutrition/Aloe-Vera-v1.png' className={homeStyles.image}
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
                  $51.00
                </Typography>
                <Typography variant="h5" fontWeight={500} component="article" >
                  <LabelIcon />Bebidas
                </Typography>
              </div>
              <div className={homeStyles.card__action}>
                <IconButton color="primary" aria-label="add an alarm">
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={homeStyles.swiper__container}>
        <Swiper
          breakpoints={{
            390: {
              width: 390,
              slidesPerView: 2,
              spaceBetween:50
            },
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 2,
              spaceBetween:50
            },
            // when window width is >= 390
            768: {
              width: 768,
              slidesPerView: 4,
              spaceBetween:50,
            },
            1200: {
              width: 1200,
              slidesPerView: 4,
              spaceBetween:50,
            },
          }}>
         
          <SwiperSlide>
            <div className={homeStyles.product__card}>
              <Stack direction="column" justifyContent="space-between" alignItems="start" spacing={2}>
                <Typography variant="p" fontSize={24} fontWeight={700} component="article" >
                  Bebida
                </Typography>
                <div>
                  <Typography variant="p" fontSize={22} fontWeight={400} component="article" >
                    50$
                  </Typography>
                  <IconButton color="secondary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </div>
              </Stack>
              <div className={homeStyles.product__image__container}>
                <img alt='sd' src='https://imcbusiness.com/public/product/health-nutrition/Aloe-Vera-v1.png'
                  className={homeStyles.product__image}>
                </img>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={homeStyles.product__card}>

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={homeStyles.product__card}>


            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={homeStyles.product__card}>

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={homeStyles.product__card}>

            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default home