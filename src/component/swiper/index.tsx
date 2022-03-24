import React from 'react';
import { Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation, Lazy } from 'swiper';
import './index.less';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Pagination, Navigation, Lazy]);
const Index = (props: { bannerList: [] }) => {
  const bannerList = props.bannerList;
  return (
    <Swiper
      className="swiperContainer"
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
      spaceBetween={0}
      centeredSlides={true}
    >
      {bannerList.map((item: { imageUrl: string }) => {
        return (
          <SwiperSlide key={item.imageUrl} className="swiperSlide">
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
