import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import { Tabs } from 'antd';
import SongTable from '@/component/songTable/index' // 热门歌曲
import { getPlayListDetail,getAlbumDetail } from '@/api/api';
import {songDetailType} from '@/api/interface'
import SongInfo from './SongInfo'
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
  let arr = props.location.pathname.split('/')
  let id = props.match.params.id
  const [songdetail, setSongdetail] = useState<songDetailType|null>(null)
  useEffect(() => {
    getsongDetail()
  }, [id]);
  // 获取歌单/专辑详情
  const getsongDetail = async() => {
    if(arr[1] == 'song'){
      const result:songDetailType =  await getPlayListDetail(id)
      setSongdetail(result);
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
    <div className={styles.singerDetail}>
      <SongInfo songdetail={songdetail}></SongInfo>
      <Tabs defaultActiveKey="1" style={{marginTop: '20px'}}>
      <TabPane tab="歌曲" key="1">
        {
          songdetail && <SongTable songArray={songdetail.tracks}/>
        }
      </TabPane>
      <TabPane tab="评论" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="相似歌单" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  </div>
  );
};

export default index;
