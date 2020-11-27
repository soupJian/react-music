import React from 'react'
import '../../asset/font/iconfont.css'
import styles from './index.less'
interface SongList{
    copywriter: string
    id: number
    name: string
    picUrl: string
    playCount: number
}

const Index = (props: {hotSongList: []}) => {
    const hotSongList = props.hotSongList
    return ( 
        <div className={styles.songList_wrap}>
            {
                hotSongList.map((item:SongList) =>{
                    return <div className={styles.songList_item} key={item.id}>
                        <img src={item.picUrl}/>
                        <div className={styles.shade}>
                            <span className="iconfont icon-MusicAcc"></span>
                            {item.playCount}
                        </div>
                        <p className={styles.name}>{item.name}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Index
