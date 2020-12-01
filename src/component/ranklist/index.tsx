import React from 'react';
import { List, Avatar } from 'antd';
import styles from './index.less';

interface ranklistType {
  id: number;
  name: string;
  coverImgUrl: string;
  updateFrequency: string;
}
const Index = (props: { ranklist: []; id: number; onChangeRank: any }) => {
  const ranklist = props.ranklist;
  const id = props.id;
  const chooseRank = (item: { id: number }) => {
    props.onChangeRank(item.id);
  };
  return (
    <div className={styles.ranklist}>
      {ranklist.map((item: ranklistType) => {
        return (
          <div
            className={
              item.id === id ? styles.item_active : styles.item_default
            }
            key={item.id}
            onClick={() => {
              chooseRank(item);
            }}
          >
            <img src={item.coverImgUrl} />
            <div className={styles.item_des}>
              <p className={styles.des_name}>{item.name}</p>
              <p className={styles.des_update}>{item.updateFrequency}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
