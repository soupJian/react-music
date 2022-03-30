import React, { useEffect, useState } from 'react';
import MvList from '@/component/mvList/index';
import { personalizedMv } from '@/services/mv/index';
import { mvType } from '@/services/mv/type';
import styles from './index.less';
const areaList = [
  { title: '全部', key: '全部' },
  { title: '内地', key: '内地' },
  { title: '港台', key: '港台' },
  { title: '欧美', key: '欧美' },
  { title: '日本', key: '日本' },
  { title: '韩国', key: '韩国' },
];
const typeList = [
  { title: '全部', key: '全部' },
  { title: '官方版', key: '官方版' },
  { title: '原生', key: '原生' },
  { title: '现场版', key: '现场版' },
  { title: '网易出品', key: '网易出品' },
];
const index = () => {
  const [type, setType] = useState<string>('全部');
  const [area, setArea] = useState<string>('全部');
  const [mvList, setMvList] = useState<mvType[]>([]);
  useEffect(() => {
    // 推荐MV
    getPersonalizedMv();
  }, [area, type]);
  const checkType = (key: string) => {
    setType(key);
  };
  const checkArea = (key: string) => {
    setArea(key);
  };
  const getPersonalizedMv = async () => {
    const res = await personalizedMv(area, type);
    setMvList(res);
  };
  return (
    <div className={styles.mv}>
      <div className={styles.tag}>
        <div className={styles.tag_area}>
          <div className={styles.tag_item}>地区：</div>
          {areaList.map((item: { title: string; key: string }) => {
            return (
              <div
                key={item.key}
                className={`${styles.tag_item} ${
                  item.key === area ? styles.active : ''
                }`}
                onClick={() => {
                  checkArea(item.key);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className={styles.tag_type}>
          <div className={styles.tag_item}>类型：</div>
          {typeList.map((item: { title: string; key: string }) => {
            return (
              <div
                key={item.key}
                className={`${styles.tag_item} ${
                  item.key === type ? styles.active : ''
                }`}
                onClick={() => {
                  checkType(item.key);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.singer_wrap}>
        <MvList list={mvList} />
      </div>
    </div>
  );
};

export default index;
