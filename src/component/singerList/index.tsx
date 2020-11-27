import React from 'react'
import styles from  './index.less'
interface singerType{
    id: number
    name: "刘大壮"
    picUrl: string
}
const index = (props:{singerlist:[]}) => {
    const singerlist = props.singerlist    
    return (
        <div className={styles.singerlist}>
            {
                singerlist.map((item:singerType)=>{
                    return <div key={item.id} className={styles.singer_item}>
                        <img src={item.picUrl}/>
                        <p>{item.name}</p>
                    </div>
                })
            }
        </div>
    )
}

export default index
