import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import {propsType,playlistType} from '@/tsType/index'
import { getPlayListDetail,getAlbumDetail } from '@/api/api';
// import {playListDetailType} from '@/type/interface'
import SongDetail from '@/component/detail/index'
import SimiList from '@/component/simi/index'
import styles from './index.less'
const index = (props:propsType) => {
  let arr = props.location.pathname.split('/')
  let id = props.match.params.id
  // const [id,setId] = useState(props.match.params.id)
  // const [similist, setSimilist] = useState<[]>([]);
  const [songdetail, setSongdetail] = useState<playlistType>({
    name: '',
    coverImgUrl: '',
    description: '',
    tracks: [],
  });
  useEffect(() => {
    getsongDetail()
    // getSimi()
  }, [id]);
  // 获取歌单/专辑详情
  const getsongDetail = async() => {
    if(arr[1] == 'song'){
      // const result:playListDetailType =  await getPlayListDetail(id)
      // setSongdetail(result.playlist);
    }
    // if(arr[1] == 'album'){
    //   const result =  await getAlbumDetail(id)
    //   let list = {
    //     name: result.album.name,
    //     coverImgUrl: result.album.picUrl,
    //     description: '',
    //     tracks: result.songs
    //   }
    //   setSongdetail(list);
    // }
  }
  // 获取相似歌单
  const getSimi = async() => {
  //   const result =  await request({
  //     url: '/related/playlist',
  //     data: `id=${id}`
  // })
    // setSimilist(result.data.playlists)
  }
  const changeId= (id:number) =>{
    id = id
    history.replace(`/song/${id}`)    
  }
  return (
    <div className={styles.song}>
      <div className={styles.song_detail}>
        <SongDetail detailObj={songdetail}></SongDetail>
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
