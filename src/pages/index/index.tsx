import React, { useState, useEffect } from 'react';
import { request } from '../../api/index';
import Swiper from '@/component/swiper/index';
import SongList from '@/component/songList';
import styles from './index.less';
const index = () => {
  const [banners, setBanners] = useState([] as []);
  const [hotSongList, setHotSongList] = useState([] as []);
  useEffect(() => {
    getBanners();
  }, []);
  useEffect(() => {
    getHotSong();
  }, []);
  // 获取banners
  const getBanners = async () => {
    const result = await request({
      url: '/banner',
    });
    setBanners(result.data.banners);
  };
  // 获取推荐歌单
  const getHotSong = async () => {
    const result = await request({
      url: '/personalized',
    });
    setHotSongList(result.data.result);
  };
  return (
    <div className={styles.recommend}>
      {/* swiper区域 */}
      <div className={styles.swiper_wrap}>
        <Swiper bannerList={banners}></Swiper>
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
