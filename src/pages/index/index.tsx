import React,{useState,useEffect} from 'react'
import request from '../../api/index'
import Swiper from '@/component/swiper/index'
import 'swiper/swiper-bundle.css'
import styles from './index.less'
const index = () => {
    const [banners,setBanners] = useState([] as [])
    useEffect(()=>{
        getBanners()
    },[])
    // 获取banners
    const getBanners = () => {
        request({
            url: '/banner'
        })?.then((res:{banners: []})=>{
            setBanners(res.banners)
        })
    }
    return (
        <div className={styles.recommend}>
            {/* swiper区域 */}
            <div className={styles.swiper_wrap}>
                <Swiper bannerList={banners}></Swiper>
            </div>
        </div>
    )
}

export default index
