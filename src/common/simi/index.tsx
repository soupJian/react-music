import React from 'react';
import styles from './index.less';
import { similist } from '@/tsType/index';
const Index = (props: { list: []; id: number; onChangeId: any }) => {
  const list = props.list;
  const id = props.id;
  const chooseId = (item: { id: number }) => {
    props.onChangeId(item.id);
  };
  return (
    <div className={styles.list}>
      {list.map((item: similist) => {
        return (
          <div
            className={
              item.id === id ? styles.item_active : styles.item_default
            }
            key={item.id}
            onClick={() => {
              chooseId(item);
            }}
          >
            <img src={item.coverImgUrl} />
            <div className={styles.item_des}>
              <p className={styles.des_name}>{item.name}</p>
              {item.updateFrequency ? (
                <p className={styles.des_update}>{item.updateFrequency}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
