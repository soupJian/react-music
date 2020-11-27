import React, { lazy } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore, { Pagination,Autoplay,Navigation,Lazy } from 'swiper';
import styles from './index.less'
SwiperCore.use([Pagination,Autoplay,Navigation,Lazy])
const Index = (props: {bannerList: []}) => {
    const bannerList = props.bannerList
    return ( 
            <Swiper className={styles.swiper_banner}
            loop
            pagination={{clickable:true}}
            autoplay={{disableOnInteraction: false}}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'}}
            lazy={{
                loadPrevNext: true
            }}
            >
                {   
                    
                    bannerList.map((item:{imageUrl:string}) => {
                        return <SwiperSlide key={item.imageUrl} className={styles.swiper_item}>
                            <img src={item.imageUrl} />
                        </SwiperSlide>
                    })
                }
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>
    )
}

export default Index
