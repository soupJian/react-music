import React from 'react';
import { history } from 'umi';
import { Descriptions, Skeleton } from 'antd';
import { albumType } from '@/services/album/type';
import { formatDate } from '@/utils/common';
import styles from '../info.less';
interface props {
  album: albumType | null;
}
const index = (props: props) => {
  const album = props.album;
  const toSinger = (id: number) => {
    history.push(`/singer/${id}`);
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
              {formatDate(album.publishTime)}
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
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
    </>
  );
};

export default index;
