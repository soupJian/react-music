import React, { useState, useEffect } from 'react';
import Swiper from '@/component/swiper/index';
import SongList from '@/component/songList/index';
import { getBannerList, getPersionaLized } from '@/api/api';
import { bannerItemType, playListItemType } from '@/api/interface';
import styles from './index.less';
const index = () => {
  const [bannerList, setBannerList] = useState<bannerItemType[]>([]);
  const [hotSongList, setHotSongList] = useState<playListItemType[]>([]);
  useEffect(() => {
    getBanners();
    getPersionaLizedList();
  }, []);
  // 获取banners
  const getBanners = async () => {
    const result: bannerItemType[] = await getBannerList();
    setBannerList(result);
  };
  // 获取推荐歌单
  const getPersionaLizedList = async () => {
    const res: playListItemType[] = await getPersionaLized();
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
