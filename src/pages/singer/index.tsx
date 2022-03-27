import React, { useState, useEffect } from 'react';
import SingerList from '@/component/singerList';
import { getArticList } from '../../api/api';
import { singerListItemType } from '@/api/interface';
import styles from './index.less';

const areaList = [
  { title: '全部', key: -1 },
  { title: '华语', key: 7 },
  { title: '欧美', key: 96 },
  { title: '日本', key: 8 },
  { title: '韩国', key: 16 },
  { title: '其他', key: 0 },
];
const typeList = [
  { title: '全部', key: -1 },
  { title: '男', key: 1 },
  { title: '女', key: 2 },
  { title: '乐队', key: 3 },
];
const index = () => {
  const [type, setType] = useState(-1);
  const [area, setArea] = useState(-1);
  const [data, setDate] = useState({ type: type, area: area });
  const [singerlist, setSingerlist] = useState<singerListItemType[]>([]);
  const checkType = (key: number) => {
    setType(key);
    setDate({ type: key, area: area });
  };
  const checkArea = (key: number) => {
    setArea(key);
    setDate({ type: type, area: key });
  };
  useEffect(() => {
    getSingerList();
  }, [type, area]);
  const getSingerList = async () => {
    const result: singerListItemType[] = await getArticList(type, area);
    setSingerlist(result);
  };
  return (
    <div className={styles.singer}>
      <div className={styles.tag}>
        <div className={styles.tag_area}>
          {areaList.map((item: { title: string; key: number }) => {
            return (
              <div
                key={item.key}
                className={`${styles.tag_item} ${
                  item.key === data.area ? styles.active : ''
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
          {typeList.map((item: { title: string; key: number }) => {
            return (
              <div
                key={item.key}
                className={`${styles.tag_item} ${
                  item.key === data.type ? styles.active : ''
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
      <div className="singer_wrap">
        <SingerList singerlist={singerlist}></SingerList>
      </div>
    </div>
  );
};

export default index;
