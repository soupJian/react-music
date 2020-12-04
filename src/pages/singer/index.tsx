import React, { useState, useEffect } from 'react';
import SingerList from '@/component/singerList';

import { request } from '../../api/index';
import './index.less';

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
  const [singerlist, setSingerlist] = useState([] as []);
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
    const result = await request({
      url: `/artist/list?type=${type}&area=${area}`,
    });
    setSingerlist(result.data.artists);
  };
  return (
    <div className="singer">
      <div className="tag">
        <div className="tag_area">
          {areaList.map((item: { title: string; key: number }) => {
            return (
              <div
                key={item.key}
                className="tag_item"
                style={{ color: item.key === data.area ? '#ffcd32' : '#fff' }}
                onClick={() => {
                  checkArea(item.key);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="tag_type">
          {typeList.map((item: { title: string; key: number }) => {
            return (
              <div
                key={item.key}
                className="tag_item"
                style={{ color: item.key === data.type ? '#ffcd32' : '#fff' }}
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
