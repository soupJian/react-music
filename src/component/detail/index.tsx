import React from 'react';
import { Button, Image, Tooltip } from 'antd';
import { connect, MusicModelState } from 'umi';
import { songItemType } from '@/tsType/index';
import { formatTime, shuffle } from '@/component/common_ts';
import styles from './index.less';
import SongTable from '../songTable/index';
import '@/asset/font/iconfont.css';
interface playlistType {
  name: string;
  coverImgUrl: string;
  description: string;
  tracks: [];
}
const Index = (props: any) => {
  const detailObj = props.detailObj;
  const mode = props.music.mode;
  // 随机播放
  const randowPlay = () => {
    changeMode();
  };
  // 切换播放模式
  const changeMode = () => {
    props.dispatch({
      type: 'music/setMode',
      payload: 'randow',
    });
    const dataSource = detailObj.tracks.map((item: songItemType) => {
      return {
        name: item.name,
        duration: formatTime(item.dt),
        id: item.id,
        singer: item.ar,
        al: item.al, // 专辑
        dt: item.dt, // 播放时长
      };
    });
    props.dispatch({
      type: 'music/setPlayList',
      playList: JSON.parse(JSON.stringify(dataSource)),
    });
    // 设置随机播放列表
    props.dispatch({
      type: 'music/setRandowList',
      randowList: JSON.parse(JSON.stringify(shuffle(dataSource))),
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      currentIndex: 0,
    });
  };
  return (
    <div className={styles.rank_detail}>
      <div className={styles.detial_title}>
        <Image src={detailObj.coverImgUrl} />
        <div className={styles.title_des}>
          <div className={styles.title_header}>
            <p className={styles.title_name}>{detailObj.name}</p>
            <Tooltip
              placement="bottom"
              title={detailObj.description}
              overlayStyle={{ maxWidth: '500px' }}
            >
              <p className={styles.title_description}>
                {detailObj.description}
              </p>
            </Tooltip>
          </div>
          <div className={styles.title_aciton}>
            <Button
              type="primary"
              danger
              className={styles.playButton}
              icon={<span className="iconfont icon-play"></span>}
              onClick={randowPlay}
            >
              随机播放全部
            </Button>
            <Button
              type="primary"
              icon={<span className="iconfont icon-weibiaoti1"></span>}
            >
              收藏
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.detail_content}>
        <SongTable songitemlist={detailObj.tracks}></SongTable>
      </div>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);