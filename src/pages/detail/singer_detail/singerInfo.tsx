import React from 'react';
import { Row, Col } from 'antd';
import { singerDetailType } from '@/api/interface';
import styles from './singerInfo.less';
interface propsType {
  singer: singerDetailType | null; // 歌手信息
}
const index = (props: propsType) => {
  const singer: singerDetailType | null = props.singer;
  return (
    <>
      {singer ? (
        <div className={styles.singerHeader}>
          <img src={singer.picUrl} className={styles.singerPic}></img>
          <div className={styles.singerInfo}>
            <p>
              歌手：<span className={styles.name}>{singer.name}</span>
            </p>
            <p>
              歌曲数：<span>{singer.musicSize}</span>
            </p>
            <p>
              专辑数: <span>{singer.albumSize}</span>
            </p>
            <p>
              MV数: <span>{singer.mvSize}</span>
            </p>
            <p className={styles.desc}>简介：{singer.briefDesc}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default index;
