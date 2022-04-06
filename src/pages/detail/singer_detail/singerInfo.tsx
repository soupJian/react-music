import React from 'react';
import { Descriptions, Skeleton } from 'antd';
import { singerType } from '@/services/singer/type';
import { formatDate } from '@/utils/common';
import styles from '../info.less';
interface propsType {
  singer: singerType | null; // 歌手信息
}
const index = (props: propsType) => {
  const singer: singerType | null = props.singer;
  return (
    <>
      {singer ? (
        <div className={styles.singer}>
          <img src={singer.picUrl} className={styles.picUrl}></img>
          <Descriptions className={styles.descriptions}>
            <Descriptions.Item label="名称">{singer.name}</Descriptions.Item>
            <Descriptions.Item label="英文名">
              {singer.alias.map((item: string) => {
                return <span key={item}>{item}</span>;
              })}
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {formatDate(singer.publishTime)}
            </Descriptions.Item>

            <Descriptions.Item label="音乐数">
              {singer.musicSize}
            </Descriptions.Item>
            <Descriptions.Item label="专辑数">
              {singer.albumSize}
            </Descriptions.Item>
            <Descriptions.Item label="MV数">{singer.mvSize}</Descriptions.Item>
            <Descriptions.Item label="简介">
              <p className={styles.briefDesc}>{singer.briefDesc}</p>
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
