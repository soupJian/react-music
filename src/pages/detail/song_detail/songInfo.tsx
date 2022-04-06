import React from 'react';
import { Descriptions } from 'antd';
import { formatDate } from '@/utils/common';
import { songDetailType } from '@/services/song/type';
import styles from '../info.less';
interface props {
  songdetail: songDetailType | null; // 歌手信息
}
const index = (props: props) => {
  const song: songDetailType | null = props.songdetail;
  return (
    <>
      {song && (
        <div className={styles.song}>
          <img src={song.coverImgUrl} className={styles.picUrl}></img>
          <Descriptions className={styles.descriptions}>
            <Descriptions.Item label="名称">{song.name}</Descriptions.Item>
            <Descriptions.Item label="标签">
              {song.tags.map((item: string) => {
                return (
                  <span key={item} style={{ marginRight: '5px' }}>
                    {item}
                  </span>
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {formatDate(song.updateTime)}
            </Descriptions.Item>
            <Descriptions.Item label="歌曲">
              {song.commentCount}
            </Descriptions.Item>
            <Descriptions.Item label="创建者">
              {song.creator.nickname}
            </Descriptions.Item>
            <Descriptions.Item> </Descriptions.Item>
            <Descriptions.Item label="描述">
              <p className={styles.briefDesc}>{song.description}</p>
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </>
  );
};

export default index;
