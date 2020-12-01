import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import SongItem from '@/common/songItem/index';
import '@/asset/font/iconfont.css';
interface playlistType {
  name: string;
  coverImgUrl: string;
  description: string;
  tracks: [];
}
const Index = (props: { rankdetail: playlistType }) => {
  const rankdetail = props.rankdetail;
  return (
    <div className={styles.rank_detail}>
      <div className={styles.detial_title}>
        <img src={rankdetail.coverImgUrl} alt="" />
        <div className={styles.title_des}>
          <div className={styles.title_header}>
            <p className={styles.title_name}>{rankdetail.name}</p>
            <p className={styles.title_description}>{rankdetail.description}</p>
          </div>
          <div className={styles.title_aciton}>
            <Button
              type="primary"
              danger
              className={styles.playButton}
              icon={<span className="iconfont icon-play"></span>}
            >
              随机播放全部
            </Button>
            <Button
              type="primary"
              icon={<span className="iconfont icon-weibiaoti1"></span>}
            >
              收藏
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.detail_content}>
        <SongItem songitemlist={rankdetail.tracks}></SongItem>
      </div>
    </div>
  );
};

export default Index;
