import React, { useState, useEffect } from 'react';
import RankList from '@/component/ranklist/index';
import RankDetail from '@/common/detail/index';
import { request } from '@/api/index';
import styles from './index.less';
import { playlistType } from '@/tsType/index';
const rank = () => {
  const [ranklist, setRanklist] = useState<[]>([]);
  const [id, setId] = useState(0);
  const [rankdetail, setRankdetail] = useState<playlistType>({
    name: '',
    coverImgUrl: '',
    description: '',
    tracks: [],
  });
  useEffect(() => {
    getRankList();
  }, []);
  useEffect(() => {
    getRankDetail();
  }, [id]);
  // 获取排行榜
  const getRankList = async () => {
    const result = await request({
      url: '/toplist',
    });
    setRanklist(result.data.list);
    setId(result.data.list[0].id);
  };
  const getRankDetail = async () => {
    if (id == 0) {
      return;
    }
    const result = await request({
      url: `/playlist/detail?id=${id}`,
    });
    setRankdetail(result.data.playlist);
  };
  const changeRank = (id: number) => {
    setId(id);
  };
  return (
    <div className={styles.rank}>
      <div className={styles.rank_detail}>
        <RankDetail detailObj={rankdetail}></RankDetail>
      </div>
      <div className={styles.rank_list}>
        <RankList
          ranklist={ranklist}
          id={id}
          onChangeRank={(id: number) => {
            changeRank(id);
          }}
        ></RankList>
      </div>
    </div>
  );
};

export default rank;
