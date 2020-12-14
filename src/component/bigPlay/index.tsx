import React from 'react';
import { connect, MusicModelState } from 'umi';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import { songItemType } from '../../tsType/index';
const Index = (props: any) => {
  const playList = props.music.playList;
  const randowList = props.music.randowList;
  const mode = props.music.mode;
  const currentIndex = props.music.currentIndex;
  const id = randowList[currentIndex].id;
  const changeMode = () => {
    props.changeMode();
  };
  const chooseMusic = (item: songItemType, index: number) => {
    let chooseIndex = index;
    if (mode != 'sequence') {
      chooseIndex = randowList.findIndex((i: songItemType) => {
        return i.id == item.id;
      });
    }
    props.dispatch({
      type: 'music/setCurrentIndex',
      payload: { currentIndex: chooseIndex },
    });
  };
  return (
    <div className={styles.big_playlist}>
      <div className={styles.music_playlist}>
        <div className={styles.title}>当前播放( {playList.length} )</div>
        <div className={styles.list}>
          <div onClick={changeMode}>
            <span
              className={`iconfont ${
                mode == 'sequence'
                  ? 'icon-sequence'
                  : mode == 'randow'
                  ? 'icon-suiji'
                  : 'icon-xunhuan02'
              }`}
            ></span>
            <span style={{ marginLeft: '5px' }}>
              {mode == 'sequence'
                ? '顺序播放'
                : mode == 'randow'
                ? '随机播放'
                : '循环播放'}
            </span>
          </div>
          <div>
            <span
              className="iconfont icon-delete"
              style={{ marginRight: '5px' }}
            ></span>
          </div>
        </div>
        <div className={styles.playlist}>
          {playList.map((item: songItemType, index: number) => {
            return (
              <div className={styles.list} key={item.id}>
                <div className={styles.left}>
                  <span
                    className={`iconfont ${
                      item.id == id ? 'icon-Pause' : `${styles.empty}`
                    }`}
                  ></span>
                  <span
                    className={styles.name}
                    onClick={() => {
                      chooseMusic(item, index);
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <div>
                  <span className="iconfont icon-aixin-xian"></span>
                  <span className="iconfont icon-iconset0127"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.music_detail}></div>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
