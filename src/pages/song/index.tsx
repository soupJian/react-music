import React, { useState, useEffect } from 'react';
import RankList from '@/component/rankList';
import { TOP_LIST } from '@/services/song/index';
import { rankListType } from '@/services/song/type';
import styles from './index.less';
const rank = () => {
  const [ranklist, setRanklist] = useState<rankListType[]>([]);
  useEffect(() => {
    getRankList();
  }, []);
  // 获取排行榜
  const getRankList = async () => {
    const result: rankListType[] = await TOP_LIST();
    setRanklist(result);
  };
  // const getRankDetail = async () => {
  //   if (id == 0) {
  //     return;
  //   }
  //   // const result = await request({
  //   //   url: `/playlist/detail?id=${id}`,
  //   // });
  //   // setRankdetail(result.data.playlist);
  // };
  return (
    <div className={styles.rank}>
      <RankList ranklist={ranklist}></RankList>
    </div>
  );
};

export default rank;
