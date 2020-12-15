import React from 'react';
import { connect, MusicModelState } from 'umi';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import { songItemType } from '../../tsType/index';
const Index = (props: any) => {
  const playList = props.music.playList;
  const randowList = props.music.randowList;
  const songReady = props.songReady;
  const playing = props.playing;
  const mode = props.music.mode;
  const currentIndex = props.music.currentIndex;
  const music = randowList[currentIndex];
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
  const changeMusic = (index: number) => {
    props.changeMusic(index);
  };
  const togglePlay = () => {
    props.togglePlay();
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
                      item.id == music.id ? 'icon-Pause' : `${styles.empty}`
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
      <div className={styles.music_detail}>
        <div className={styles.detail_wrap}>
          <div className={styles.title}>
            <p className={styles.name}>{music.name}</p>
            <p className={styles.singer}>
              {music.singer.map((item: { id: number; name: string }) => {
                return <span key={item.id}>{item.name}</span>;
              })}
            </p>
          </div>
          <div className={styles.img_wrap}>
            <img
              src={music.al.picUrl}
              className={
                playing ? styles.play : `${styles.play} ${styles.pause}`
              }
            />
          </div>
          <div className={styles.action}>
            <span
              className={`iconfont ${
                mode == 'sequence'
                  ? 'icon-sequence'
                  : mode == 'randow'
                  ? 'icon-suiji'
                  : 'icon-xunhuan02'
              }`}
              onClick={changeMode}
            ></span>
            <span className="iconfont icon-aixin-xian"></span>
            <span
              className="iconfont icon-previous"
              onClick={() => {
                changeMusic(-1);
              }}
            ></span>
            <span
              className={`iconfont ${playing ? 'icon-Pause' : 'icon-play'} ${
                songReady ? '' : styles.disabled
              }`}
              style={{ fontSize: '28px' }}
              onClick={togglePlay}
            ></span>
            <span
              className="iconfont icon-next"
              onClick={() => {
                changeMusic(1);
              }}
            ></span>
          </div>
        </div>
        <div className={styles.lyric}></div>
      </div>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
