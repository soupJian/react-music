import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import { Tabs } from 'antd';
import SongTable from '@/component/songTable/index' // 热门歌曲
import {ALBUM_DETAIL} from '@/services/album/index'
import {albumType} from '@/services/album/type'
import {songType} from '@/services/song/type'
import AlbumInfo from './albumInfo'
import styles from './index.less'
const { TabPane } = Tabs;
interface props{
  location:{
    pathname: string
  },
  match:{
    params:{
      id: string
    }
  }
}
const index = (props:props) => {
  const id:string = props.match.params.id
  const [album,setAlbum] = useState<albumType|null>(null)
  const [songs,setSongs] = useState<songType[]>([])
  useEffect(() => {
    getAlbum()
  }, [id]);
  // 获取歌单/专辑详情
  const getAlbum = async() => {
      const result =  await ALBUM_DETAIL(id)
      setSongs(result.songs)
      setAlbum(result.album)
    //   let list = {
    //     name: result.album.name,
    //     coverImgUrl: result.album.picUrl,
    //     description: '',
    //     tracks: result.songs
    //   }
    //   setSongdetail(list);
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
    <div className={styles.singerDetail}>
      <AlbumInfo album={album}></AlbumInfo>
      <Tabs defaultActiveKey="1" style={{marginTop: '20px'}}>
      <TabPane tab="歌曲" key="1">
        {
          <SongTable songArray={songs}/>
        }
      </TabPane>
      <TabPane tab="评论" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="相似专辑" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  </div>
  );
};

export default index;
