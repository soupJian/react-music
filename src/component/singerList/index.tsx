import React from 'react';
import { history } from 'umi';
import styles from './index.less';
interface singerType {
  id: number;
  name: string;
  picUrl: string;
}
const index = (props: { singerlist: [] }) => {
  const toSinge = (item: singerType) => {
    console.log(item);

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
              toSinge(item);
            }}
          >
            <img src={item.picUrl} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default index;
