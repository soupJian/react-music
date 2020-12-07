import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import {propsType,playlistType} from '@/tsType/index'
import { request,requestCookie } from '@/api/index';
import SongDetail from '@/common/detail/index'
import SimiList from '@/common/simi/index'
import styles from './index.less'
const index = (props:propsType) => {
  const [id,setId] = useState(props.match.params.id)
  const [similist, setSimilist] = useState<[]>([]);
  const [songdetail, setSongdetail] = useState<playlistType>({
    name: '',
    coverImgUrl: '',
    description: '',
    tracks: [],
  });
  useEffect(() => {
    getsongDetail()
    getSimi()
  }, [id]);
  // 获取歌单详情
  const getsongDetail = async() => {
    const result =  await requestCookie({
        url: '/playlist/detail',
        data: `id=${id}`
    })
    setSongdetail(result.data.playlist);
  }
  // 获取相似歌单
  const getSimi = async() => {
    const result =  await request({
      url: '/simi/playlist',
      data: `id=${id}`
  })
    setSimilist(result.data.playlists)
  }
  const changeId= (id:number) =>{
    setId(id)
    history.push(`/song/${id}`)    
  }
  return (
    <div className={styles.song}>
      <div className={styles.song_detail}>
        <SongDetail detailObj={songdetail}></SongDetail>
      </div>
      {
        similist.length > 0 ?
          <div className={styles.song_list}>
            <SimiList
              list={similist}
              id={id}
              onChangeId={(id: number) => {
                changeId(id);
              }}
            ></SimiList>
          </div>
        : ''
      }
  </div>
  );
};

export default index;
