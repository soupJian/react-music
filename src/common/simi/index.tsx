import React from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
import { similist } from '@/tsType/index';
const Index = (props: { list: []; id: number; onChangeId: any }) => {
  // 获取Body对象高度
  let height = document.body.clientHeight;
  window.onresize = () => {
    height = document.body.clientHeight;
  };
  // 右侧列表区域滚动高度
  let simiHeight = height - 64 - 44;

  const list = props.list;
  const id = props.id;
  const chooseId = (item: { id: number }) => {
    props.onChangeId(item.id);
  };
  return (
    <div className={styles.list} style={{ height: `${simiHeight}px` }}>
      {list.map((item: similist) => {
        return (
          <Tooltip placement="bottom" title={item.name}>
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
          </Tooltip>
        );
      })}
    </div>
  );
};

export default Index;
