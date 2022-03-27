import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import SingerInfo from './singerInfo' // 头部信息
import SongTable from '@/component/songTable/index' // 热门歌曲
import { getArticDetail } from '@/api/api';
import {singerDetailType,songItemType} from '@/api/interface'
import styles from  './index.less'
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
  const [singer,setSinger] = useState<singerDetailType|null>(null)
  const [hotSongs,setHotSongs] = useState<songItemType[]|null>(null)
  useEffect(() => {
    getsingerBase()
  }, [id]);
  // 获取歌手基本信息和热门歌曲
  const getsingerBase = async() => {
    const {artist,hotSongs} =  await getArticDetail(id)
    setSinger(artist)
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
