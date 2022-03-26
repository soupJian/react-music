import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import SingerInfo from './singerInfo' // 头部信息
import SongTable from '@/component/songTable/index' // 热门歌曲
// import {propsType,playlistType} from '@/tsType/index'
import { request } from '@/api/index';
import styles from  './index.less'
// import SingerDetail from '@/component/detail/index'
import {singer,songArray,singerArray,InterfaceSong} from '@/type/music'
interface props{
  match:{
    params:{
      id: string
    }
  }
}
const { TabPane } = Tabs;
const index = (props:props) => {
  const [id,setId] = useState<string>(props.match.params.id)
  const [singer,setSinger] = useState<singer|null>(null)
  const [hotSongs,setHotSongs] = useState<songArray[]|null>(null)
  // const [similist, setSimilist] = useState<[]>([]);
  // const [singerdetail, setSingerdetail] = useState<playlistType>({
  //   name: '',
  //   coverImgUrl: '',
  //   description: '',
  //   tracks: [],
  // });
  useEffect(() => {
    getsingerBase()
  }, [id]);
  // 获取歌手基本信息和热门歌曲
  const getsingerBase = async() => {
    const result =  await request({
      url: '/artists',
      data: `id=${id}`
    })
    // 歌手基本信息
    const singer:singer = {
      id: result.data.artist.id, // id
      name: result.data.artist.name, // 昵称
      briefDesc: result.data.artist.briefDesc, // 基本信息
      musicSize: result.data.artist.musicSize, // 音乐数
      albumSize: result.data.artist.albumSize, // 专辑数
      mvSize: result.data.artist.mvSize, // MV数
      picUrl: result.data.artist.picUrl // 头像
    }
    // 热门歌曲
    const hotSongs:songArray[] = result.data.hotSongs.map((item:InterfaceSong)=>{
      return {
        id: item.id, // 歌曲id
        name: item.name, // 歌曲名
        picUrl: item.al.picUrl, // 专辑封面 al.picUrl
        singer: item.ar.map((i:singerArray)=>{
          return {
            id: i.id,
            name: i.name
          }
        }), // 歌手 ar[]
        dt: item.dt
      }
    })
    setSinger(singer)
    setHotSongs(hotSongs)
    // setSingerdetail({
    //     name: artist.name,
    //     coverImgUrl: artist.picUrl,
    //     description: artist.briefDesc,
    //     tracks: result.data.hotSongs
    //   });
    // }
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
  }
  // 获取歌手详细信息
  const getSingerDetail = ()=>{

  }
  return (
    <div className={styles.singerDetail}>
      <SingerInfo singer={singer}></SingerInfo>
      <Tabs defaultActiveKey="1" style={{marginTop: '20px'}}>
        <TabPane tab="热门歌曲" key="1">
          <SongTable songArray={hotSongs}/>
        </TabPane>
        <TabPane tab="专辑" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="歌单" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="MV" key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="歌手详情" key="5">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default index;
