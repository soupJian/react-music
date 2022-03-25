import React, { useState, useEffect } from 'react';
import {propsType,playlistType} from '@/tsType/index'
import { request } from '@/api/index';
import SingerDetail from '@/component/detail/index'
import SimiList from '@/component/simi/index'
import styles from './index.less'
const index = (props:propsType) => {
  const [id,setId] = useState(props.match.params.id)
  const [similist, setSimilist] = useState<[]>([]);
  const [singerdetail, setSingerdetail] = useState<playlistType>({
    name: '',
    coverImgUrl: '',
    description: '',
    tracks: [],
  });
  useEffect(() => {
    getsingerDetail()
  }, [id]);
  // 获取歌手详情
  const getsingerDetail = async() => {
    const result =  await request({
        url: '/artists',
        data: `id=${id}`
    })
    const artist = result.data.artist  
    setSingerdetail({
        name: artist.name,
        coverImgUrl: artist.picUrl,
        description: artist.briefDesc,
        tracks: result.data.hotSongs
      });
    }
  //  const getSimiSinger = async() => {
  //   const result = await request({
  //     url:'/simi/artist',
  //     data: `id=${id}`
  //   })
  //   const artists = result.data.artists
  //   artists.forEach((item:any)=>{
  //     item.coverImgUrl = item.img1v1Url
  //   })
  //   setSimilist(artists)
  //  }
   // 切换相似歌手
  //  const changeId = (id:number) =>{
  //   setId(id)
  //  }
  return (
    <div className={styles.song}>
      <div className={styles.song_detail}>
          <SingerDetail detailObj={singerdetail}></SingerDetail>
      </div>
      {/* {
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
      } */}
</div>

  );
};

export default index;
