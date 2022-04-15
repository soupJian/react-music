import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import { Tabs } from 'antd';
import SongTable from '@/component/songTable/index' // 热门歌曲
import { SONG_DETAIL } from '@/services/song/index';
import {songDetailType} from '@/services/song/type'
import SongInfo from './songInfo'
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
  let id = props.match.params.id
  const [songdetail, setSongdetail] = useState<songDetailType|null>(null)
  useEffect(() => {
    getsongDetail()
  }, [id]);
  // 获取歌单
  const getsongDetail = async() => {
    const result:songDetailType =  await SONG_DETAIL(id)
    setSongdetail(result);
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
