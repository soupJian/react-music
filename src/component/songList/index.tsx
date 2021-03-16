import React from 'react';
import { history } from 'umi';
import { Image } from 'antd';
import '../../asset/font/iconfont.css';
import styles from './index.less';
import { SongListItem } from '../../tsType/index';

const Index = (props: { songList: [] }) => {
  const songList = props.songList;
  const toDetail = (item: SongListItem) => {
    history.push('/song/' + item.id);
  };
  return (
    <div className={styles.songList_wrap}>
      {songList.map((item: SongListItem) => {
        return (
          <div
            className={styles.songList_item}
            key={item.id}
            onClick={() => {
              toDetail(item);
            }}
          >
            {item.picUrl ? (
              <Image src={item.picUrl} />
            ) : (
              <Image src={item.coverImgUrl} />
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
