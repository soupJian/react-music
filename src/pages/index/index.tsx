import React,{useState,useEffect} from 'react'
import request from '../../api/index'
import Swiper from '@/component/swiper/index'
import HotSongList from '@/component/songList'
import styles from './index.less'
const index = () => {
    const [banners,setBanners] = useState([] as [])
    const [hotSongList,setHotSongList] = useState([] as [])
    useEffect(()=>{
        getBanners()
    },[])
    useEffect(()=>{
        getHotSong()
    },[])
    // 获取banners
    const getBanners = () => {
        request({
            url: '/banner'
        })?.then((res:{banners: []})=>{
            setBanners(res.banners)
        })
    }
    // 获取推荐歌单
    const getHotSong = () => {
        request({
            url: '/personalized'
        })?.then((res:{result: []})=>{
            setHotSongList(res.result)
        })
    }
    return (
        <div className={styles.recommend}>
            {/* swiper区域 */}
            <div className={styles.swiper_wrap}>
                <Swiper bannerList={banners}></Swiper>
            </div>
            <div>
                <div className={styles.title}>推荐歌单</div>
                <div className="recommend_list">
                    <HotSongList hotSongList={hotSongList}></HotSongList>
                </div>
            </div>
        </div>
    )
}

export default index
