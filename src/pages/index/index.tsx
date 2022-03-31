import React, { useState, useEffect } from 'react';
import Swiper from '@/component/swiper/index';
import SongList from '@/component/songList/index';
import { BANNER, PERSONALIZED } from '@/services/index/index';
import { bannerType } from '@/services/index/type';
import { playListype } from '@/services/song/type';

import styles from './index.less';
const index = () => {
  const [bannerList, setBannerList] = useState<bannerType[]>([]);
  const [hotSongList, setHotSongList] = useState<playListype[]>([]);
  useEffect(() => {
    getBanners();
    getPersionaLizedList();
  }, []);
  // 获取banners
  const getBanners = async () => {
    const result = await BANNER();
    setBannerList(result);
  };
  // 获取推荐歌单
  const getPersionaLizedList = async () => {
    const res = await PERSONALIZED();
    setHotSongList(res);
  };
  return (
    <div className={styles.recommend}>
      {/* swiper区域 */}
      <div className={styles.swiper_wrap}>
        <Swiper bannerList={bannerList}></Swiper>
      </div>
      <div>
        <div className={styles.title}>推荐歌单</div>
        <div className={styles.recommend_list}>
          <SongList songList={hotSongList}></SongList>
        </div>
      </div>
    </div>
  );
};

export default index;
