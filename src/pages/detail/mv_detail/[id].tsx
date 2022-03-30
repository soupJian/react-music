import React, { useState, useEffect,useRef } from 'react';
import {history} from 'umi'
import { Tabs,Row,Col,Image } from 'antd';
import {MvPlayUrl,MvDetail,simiMV} from '@/services/mv/index'
import styles from './index.less'
import {mvDetail,mvType} from '@/services/mv/type'
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
  const [simi,setSimi] = useState<mvType[]>([])
  useEffect(()=>{
    getMVSrc(id)
    getMvDetail(id)
    getSimiMv(id)
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
  const getSimiMv = async(id:string)=>{
    const res = await simiMV(id)
    setSimi(res)
  }
  const playVideo = ()=>{
    video?.play()
  }
  const changeId= (id:number) =>{
    id = id
    history.replace(`/mv/${id}`)    
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
          <div className={styles.info}>
            <div>
              <span className={styles.label}>名称：</span>{detail && detail.name}
            </div>
            <div>
            <span className={styles.label}>作者：</span>{detail && detail.artistName}
            </div>
            <div>
            <span className={styles.label}>发布时间：</span>{detail && detail.publishTime}
            </div>
            <div>
            <span className={styles.label}>播放次数：</span> {detail && detail.playCount}
            </div>
            <div>
            <span className={styles.label}>简介：</span>{detail && detail.desc == '' ? '暂无简介信息' : detail?.desc}
            </div>
          </div>
          <div className={styles.simi}>
            {
              simi.map((item:mvType)=>{
                return <div key={item.id} className={styles.simiItem}>
                  <div className={styles.left}>
                    <Image src={item.cover}></Image>
                  </div>
                  <div className={styles.right}>
                    <p><span className={styles.label}>名称：</span>  {item.name}</p>
                    <p><span className={styles.label}>播放次数：</span>  {item.playCount}</p>
                  </div>
                </div>
              })
            }
          </div>
        </Col>
      </Row>
  </div>
  );
};

export default index;
