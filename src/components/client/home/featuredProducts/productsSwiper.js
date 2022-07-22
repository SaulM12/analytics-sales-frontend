import homeStyles from '../../../styles/home/home.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductsSwiper({ productsLessPrice, addProductToCart, selectedProductStyle }) {
    return (
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
                            <IconButton color="primary" aria-label="add to shopping cart" className={homeStyles.add__button}
                                onClick={() => addProductToCart(1, product)}>
                                <AddShoppingCartIcon />
                            </IconButton>
                            <a href={'/store/detail/' + product.id + '/' + product.category} className={homeStyles.product__card}
                                style={selectedProductStyle(index)}>
                                <Stack direction="column" justifyContent="start" alignItems="center" spacing={1}>
                                    <div className={homeStyles.product__image__container}>
                                        <img alt='sd' src={product.image}
                                            className={homeStyles.product__image} onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                                            }}>
                                        </img>
                                    </div>
                                    <Typography variant="p" fontSize={24} fontWeight={600} component="article"  >
                                        {product.name}
                                    </Typography>
                                    <div>
                                        <Typography variant="p" fontSize={22} fontWeight={500} component="article" >
                                            ${product.price.toFixed(2)}
                                        </Typography>

                                    </div>
                                </Stack>
                            </a>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default ProductsSwiper;