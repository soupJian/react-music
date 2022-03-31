import React from 'react';
import { singerType } from '@/services/singer/type';
import styles from './singerInfo.less';
interface propsType {
  singer: singerType | null; // 歌手信息
}
const index = (props: propsType) => {
  const singer: singerType | null = props.singer;
  return (
    <>
      {singer && (
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
      )}
    </>
  );
};

export default index;
