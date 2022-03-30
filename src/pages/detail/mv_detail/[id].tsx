import React, { useState, useEffect,useRef } from 'react';
import {history} from 'umi'
import { Tabs,Row,Col } from 'antd';
import {MvPlayUrl,MvDetail} from '@/services/mv/index'
import styles from './index.less'
import {mvDetail} from '@/services/mv/type'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const video: HTMLVideoElement | null  = videoRef.current
  const [src,setSrc] = useState<string>('')
  const [detail,setDetail] = useState<mvDetail|null>()
  useEffect(()=>{
    getMVSrc(id)
    getMvDetail(id)
  },[])
  // 获取歌单/专辑详情
  const getMVSrc = async(id:string) => {
      const src = await MvPlayUrl(id)
      setSrc(src)
  }
  const getMvDetail = async(id:string)=>{
    const res = await MvDetail(id)
    setDetail(res)
  }
  const playVideo = ()=>{
    video?.play()
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
    <div className={styles.mvDetail}>
      <Row gutter={20}>
        <Col span={16}>
          <video src={src} controls onCanPlay={playVideo} ref={videoRef}></video>
          <Tabs defaultActiveKey="1" style={{marginTop: '20px'}}>
            <TabPane tab="评论" key="1">
              Content of Tab Pane 1
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8} className={styles.description}>
          <div>
            名称: {detail && detail.name}
          </div>
          <div>
            作者: {detail && detail.artistName}
          </div>
          <div>
            发布时间: {detail && detail.publishTime}
          </div>
          <div>
            播放次数: {detail && detail.playCount}
          </div>
          <div>
            简介:{detail && detail.desc == '' ? '暂无简介信息' : detail?.desc}
          </div>
        </Col>
      </Row>
  </div>
  );
};

export default index;
