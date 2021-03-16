import React from 'react';
import { history } from 'umi';
import { Image } from 'antd';
import styles from './index.less';
import { singerType } from '@/tsType/index';
const index = (props: { singerlist: [] }) => {
  const toSinger = (item: singerType) => {
    history.push(`/singer/${item.id}`);
  };
  const singerlist = props.singerlist;
  return (
    <div className={styles.singerlist}>
      {singerlist.map((item: singerType) => {
        return (
          <div
            key={item.id}
            className={styles.singer_item}
            onClick={() => {
              toSinger(item);
            }}
          >
            <Image src={item.picUrl} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default index;
