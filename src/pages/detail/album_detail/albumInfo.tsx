import React from 'react';
import { history } from 'umi';
import { Descriptions } from 'antd';
import { albumType } from '@/api/interface';
import styles from './albumInfo.less';
interface props {
  album: albumType | null;
}
const index = (props: props) => {
  const album = props.album;
  const toSinger = (id: number) => {
    history.push(`/singer/${id}`);
  };
  function formatNum(num: number) {
    return num > 10 ? num : `0${num}`;
  }
  const formatTime = (time: string) => {
    const date = new Date(time);
    const year = date.getFullYear(); // 年
    const month = date.getMonth() + 1; // 月
    const day = date.getDate(); // 日 获取日是 getDate()方法 区别于 getDay()是星期
    return `${year}-${formatNum(month)}-${formatNum(day)}`;
  };
  return (
    <>
      {album ? (
        <div className={styles.album}>
          <img src={album.picUrl} className={styles.picUrl}></img>
          <Descriptions className={styles.descriptions}>
            <Descriptions.Item label="名称">{album.name}</Descriptions.Item>
            <Descriptions.Item label="类型">{album.type}</Descriptions.Item>
            <Descriptions.Item label="环境">{album.subType}</Descriptions.Item>
            <Descriptions.Item label="歌曲">{album.size}</Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {formatTime(album.publishTime)}
            </Descriptions.Item>
            <Descriptions.Item label="公司">{album.company}</Descriptions.Item>
            <Descriptions.Item label="歌手">
              {album.artists.map(item => {
                return (
                  <span
                    key={item.id}
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      toSinger(item.id);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : null}
    </>
  );
};

export default index;
