import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';

export default function ProductsList(props) {
    const productsInfoBlock = props.productsList.map((product, index) => {
        const productInput = props.productsInputs.find(input => {
            return input.id === product.id;
        });

        return <SwiperSlide key={index}>
            <ProductCard onChange={props.onChange} onClickPreviewBtn={props.onClickPreviewBtn} product={product} productInput={productInput}/>
        </SwiperSlide>
    });

    return (
        <div className='products-list'>
            <Swiper
                slidesPerView={"auto"}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                preventClicksPropagation={false}
                preventClicks={false}
            >
                {productsInfoBlock}
            </Swiper>
        </div>
    )
}
