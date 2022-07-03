import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import homeStyles from './home.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LabelIcon from '@mui/icons-material/Label';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { getProductsOrderByLessPrice, getProductsByCategory } from '../services/product';

function Home() {
  var [index, setIndex] = useState(0)
  const [productsLessPrice, setProductsLessPrice] = useState([])
  const [productsCategoryOne, setProductsCategoryOne] = useState([])
  const [productsCategoryTwo, setProductsCategoryTwo] = useState([])
  useEffect(() => {
    let shouldUpdate = true;
    if (shouldUpdate) {
      Promise.all([
        getProductsOrderByLessPrice(),
        getProductsByCategory("Frutas"),
        getProductsByCategory("Ropa")
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

  function selectedProductStyle(key) {
    if (key === index) {
      return {
        backgroundColor: '#dcf0ff'
      }
    } else return {}
  }
  const nextProduct = () => {
    let swiper = document.querySelector('#swiper').swiper
    setIndex(index + 1)
    if (index >= 3) {
      swiper.slideNext()
    }
  }
  const prevProduct = () => {
    let swiper = document.querySelector('#swiper').swiper
    setIndex(index - 1)
    if (index === 4 || index === 1) {
      swiper.slidePrev()
    }
  }
  var navigate = useNavigate()

  return (
    <div className={homeStyles.container}>
      <Grid container direction="row" justifyContent="center" alignItems="center" className={homeStyles.banner}>
        <Grid item sm={4} md={8} lg={4}>
          <Stack spacing={2} alignItems="flex-start" textAlign={'left'} justifyContent="center">
            <Typography variant="h2" fontWeight={700} component="h2" className={homeStyles.main__text}>
              {productsLessPrice.length && productsLessPrice[index].name}
            </Typography>
            <Typography variant="p" fontWeight={400} component="article" >
              {productsLessPrice.length && productsLessPrice[index].description}
            </Typography>
            <Button variant="contained">Añadir al carrito</Button>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <div className={homeStyles.image__container}>
            <img src={productsLessPrice.length && productsLessPrice[index].image} className={homeStyles.image}
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
                  ${productsLessPrice.length && productsLessPrice[index].price}
                </Typography>
                <Typography variant="h5" fontWeight={500} component="article" >
                  <LabelIcon />{productsLessPrice.length && productsLessPrice[index].category}
                </Typography>
              </div>
              <div className={homeStyles.card__action}>
                <IconButton color="primary" aria-label="add an alarm" onClick={prevProduct} disabled={index === 0}>
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={nextProduct} disabled={index === 5}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={homeStyles.swiper__container}>
        <Swiper id='swiper'
          breakpoints={{
            390: {
              width: 390,
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              width: 640,
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              width: 768,
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1200: {
              width: 1200,
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}>

          {
            productsLessPrice.map((product, index) =>
              <SwiperSlide key={index}>
                <div className={homeStyles.product__card} style={selectedProductStyle(index)} onClick={()=>{navigate("/store/detail/"+product.id+"/"+product.category, { replace: false })}}>
                  <Stack direction="column" justifyContent="start" alignItems="center" spacing={1}>
                    <div className={homeStyles.product__image__container}>
                      <img alt='sd' src={product.image}
                        className={homeStyles.product__image}>
                      </img>
                    </div>
                    <Typography variant="p" fontSize={24} fontWeight={600} component="article"  >
                      {product.name}
                    </Typography>
                    <div>
                      <Typography variant="p" fontSize={22} fontWeight={500} component="article" >
                        {product.price}$ <IconButton color="primary" aria-label="add to shopping cart">
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Typography>

                    </div>
                  </Stack>
                </div>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      <div className={homeStyles.product__list}>
        <Typography variant="h5" fontWeight={600} component="h2" className={homeStyles.main__text}>
          Categoria 1
        </Typography>
        <Grid container spacing={2}>
          {
            productsCategoryOne.map(product =>
              <Grid item xs={12} md={3} lg={3} justifyContent='center' key={product.id}>
                <div className={homeStyles.second__product__card}>
                  <Stack direction="column" justifyContent="start" alignItems="center" spacing={1}>
                    <div className={homeStyles.product__image__container}>
                      <img alt='sd' src={product.image}
                        className={homeStyles.product__image}>
                      </img>
                    </div>
                    <Typography variant="p" fontSize={24} fontWeight={600} component="article"  >
                      {product.name}
                    </Typography>
                    <div>
                      <Typography variant="p" fontSize={22} fontWeight={500} component="article" >
                        {product.price}$ <IconButton color="primary" aria-label="add to shopping cart">
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Typography>
                    </div>
                  </Stack>
                </div>
              </Grid>
            )
          }
        </Grid>
      </div>
      <div className={homeStyles.product__list}>
        <Typography variant="h5" fontWeight={600} component="h2" className={homeStyles.main__text}>
          Categoria 2
        </Typography>
        <Grid container spacing={2}>
          {
            productsCategoryTwo.map(product =>
              <Grid item xs={12} md={3} lg={3} justifyContent='center' key={product.id}>
                <div className={homeStyles.second__product__card}>
                  <Stack direction="column" justifyContent="start" alignItems="center" spacing={1}>
                    <div className={homeStyles.product__image__container}>
                      <img alt='sd' src={product.image}
                        className={homeStyles.product__image}>
                      </img>
                    </div>
                    <Typography variant="p" fontSize={24} fontWeight={600} component="article"  >
                      {product.name}
                    </Typography>
                    <div>
                      <Typography variant="p" fontSize={22} fontWeight={500} component="article" >
                        {product.price}$ <IconButton color="primary" aria-label="add to shopping cart">
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Typography>
                    </div>
                  </Stack>
                </div>
              </Grid>
            )
          }
        </Grid>
      </div>
    </div>
  )
}

export default Home