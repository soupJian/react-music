import React from 'react';
import { Row, Col } from 'antd';
import { songDetailType } from '@/api/interface';
import styles from './songInfo.less';
interface props {
  songdetail: songDetailType | null; // 歌手信息
}
const index = (props: props) => {
  const songdetail: songDetailType | null = props.songdetail;
  return (
    <>
      {songdetail ? (
        <div className={styles.songHeader}>
          <img src={songdetail.coverImgUrl} className={styles.songPic}></img>
          <div className={styles.songInfo}>
            <p>
              名称：<span className={styles.name}>{songdetail.name}</span>
            </p>
            <p>
              播放数<span>{songdetail.shareCount}</span>
            </p>
            <p>
              分享数: <span>{songdetail.playCount}</span>
            </p>
            <p>
              订阅数: <span>{songdetail.subscribedCount}</span>
            </p>
            <p className={styles.desc}>简介：{songdetail.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default index;
