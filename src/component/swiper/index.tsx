import React from 'react';
import { Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation, Lazy } from 'swiper';
import { bannerType } from '@/services/index/type';
import './index.less';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Pagination, Navigation, Autoplay, Lazy]);
interface props {
  bannerList: bannerType[];
}
const Index = (props: props) => {
  const bannerList = props.bannerList;
  return (
    <Swiper
      className="swiper-container"
      loop
      pagination={{ clickable: true }}
      autoplay={{ disableOnInteraction: false }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      lazy={{
        loadPrevNext: true,
      }}
      effect={'coverflow'}
      slidesPerView={1.5}
      spaceBetween={-180}
      centeredSlides={true}
    >
      {bannerList.map((item: { imageUrl: string }) => {
        return (
          <SwiperSlide key={item.imageUrl} className="swiper-slide">
            <Image src={item.imageUrl} />
          </SwiperSlide>
        );
      })}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev" style={{ color: '#ccc' }}></div>
      <div className="swiper-button-next" style={{ color: '#ccc' }}></div>
    </Swiper>
  );
};

export default Index;
