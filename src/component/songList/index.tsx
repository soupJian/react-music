import React from 'react';
import '../../asset/font/iconfont.css';
import styles from './index.less';
interface SongList {
  copywriter: string;
  id: number;
  name: string;
  picUrl?: string;
  playCount: number;
  coverImgUrl?: string;
}

const Index = (props: { songList: [] }) => {
  const songList = props.songList;
  return (
    <div className={styles.songList_wrap}>
      {songList.map((item: SongList) => {
        return (
          <div className={styles.songList_item} key={item.id}>
            {item.picUrl ? (
              <img src={item.picUrl} />
            ) : (
              <img src={item.coverImgUrl} />
            )}
            <div className={styles.shade}>
              <span className="iconfont icon-MusicAcc"></span>
              {item.playCount}
            </div>
            <p className={styles.name}>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
