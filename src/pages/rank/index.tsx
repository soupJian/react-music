import React, { useState, useEffect } from 'react';
import RankList from '@/component/rankList';
import { getTopList } from '@/api/api';
import { rankListItemType } from '@/api/interface';
import styles from './index.less';
const rank = () => {
  const [ranklist, setRanklist] = useState<rankListItemType[]>([]);
  useEffect(() => {
    getRankList();
  }, []);
  // 获取排行榜
  const getRankList = async () => {
    const result: rankListItemType[] = await getTopList();
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
