import React, { useState } from "react";
import ProductsByCategory from "../productsByCategory/productsByCategory";
import Products from "./products";
import ProductsSwiper from "./productsSwiper";

function FeaturedProducts(props) {
    const { addProductToCart, productsLessPrice, productsCategoryOne, productsCategoryTwo } = props;
    const [index, setIndex] = useState(0)

    const selectedProductStyle = (key) => {
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

    return (
        <>
            <Products addProductToCart={addProductToCart} productsLessPrice={productsLessPrice} index={index}
                nextProduct={nextProduct} prevProduct={prevProduct} />
            <ProductsSwiper addProductToCart={addProductToCart} productsLessPrice={productsLessPrice}
                selectedProductStyle={selectedProductStyle} />
            <ProductsByCategory category={'Ropa'} productsCategoryOne={productsCategoryOne}
                addProductToCart={addProductToCart} />
            <ProductsByCategory category={'Tecnología'}
                productsCategoryTwo={productsCategoryTwo} addProductToCart={addProductToCart} />
        </>
    )
}

export default FeaturedProducts;