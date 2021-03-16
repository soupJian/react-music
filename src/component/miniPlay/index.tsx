import React, { useState, useEffect, useRef } from 'react';
import { Progress, Modal, message } from 'antd';
import { connect, MusicModelState, IndexModelState } from 'umi';
import { shuffle } from '../../common/common_ts/index';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import './modal.less';
import { request, requestCookie } from '../../api/index';
import {
  formatTime,
  formatCurrentTime,
  formatPrecent,
} from '../../common/common_ts/index';
import BigPlay from '../bigPlay/index';
const Index = (props: any) => {
  const loveIds = JSON.parse(JSON.stringify(props.user.loveIds));
  const playList = JSON.parse(JSON.stringify(props.music.playList));
  const randowList = JSON.parse(JSON.stringify(props.music.randowList));
  const currentIndex = props.music.currentIndex;
  const mode = props.music.mode;
  const music = randowList[currentIndex];
  const playing = props.music.playing;
  const id: number = currentIndex == -1 ? 0 : music.id;
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current || null;
  const [currentTime, setCurrentTime] = useState(0);
  // 获取歌曲url,watch id来处理事务
  const [musicUrl, setMusicUrl] = useState<string>('');
  const [songReady, setSongReady] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getMusicUrl();
  }, [id]);
  // 获取歌曲播放地址
  const getMusicUrl = async () => {
    if (currentIndex == -1) {
      return;
    }
    const result = await request({
      url: `/song/url?id=${id}`,
    });
    // 设置歌曲播放地址
    setMusicUrl(result.data.data[0].url);
    // 切换歌曲的时候，播放与暂停按钮禁用
    setSongReady(false);
  };
  // dispatch
  const setPlaying = (playing: boolean) => {
    props.dispatch({
      type: 'music/setPlaying',
      playing,
    });
  };
  // 设置歌曲播放暂停
  const togglePlay = () => {
    if (audio && songReady) {
      if (playing) {
        // 当前是播放状态，取消播放
        setPlaying(false);
        audio.pause();
      } else {
        setPlaying(true);
        audio.play();
      }
    }
  };
  // canplay 歌曲准备完毕，可以播放
  const playMusic = () => {
    // 歌曲可以播放了
    setSongReady(true);
    setPlaying(true);
    if (audio) {
      audio.play();
    }
  };
  // timeUpdate 歌曲时间片更新
  const timeUpdate = (e: any) => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
    formatPrecent(currentTime, music.dt);
  };
  // endMusic 歌曲结束
  const endMusic = () => {
    if (mode == 'loop' || playList.length == 1) {
      loop();
    } else {
      changeMusic(1);
    }
  };
  // error 歌曲加载错误
  const error = () => {
    // 出现错误，播放按钮灰色
    setSongReady(false);
  };
  // dispatch 上一首，下一首
  const setDispatch = (index: number) => {
    props.dispatch({
      type: 'music/setCurrentIndex',
      payload: { currentIndex: index },
    });
  };
  // 上一首  下一首
  const changeMusic = (action: number) => {
    if (mode == 'loop' || playList.lengt == 1) {
      loop();
      return;
    }
    let index;
    if (action == -1) {
      // 上一首
      index = currentIndex - 1;
      if (index < 0) {
        index = playList.length - 1;
      }
    } else {
      // 下一首
      index = currentIndex + 1;
      if (index == playList.length) {
        index = 0;
      }
    }
    setDispatch(index);
  };
  // 切换播放模式
  const changeMode = () => {
    let playmode;
    switch (mode) {
      case 'sequence':
        playmode = 'randow';
        changePlayList(shuffle(playList));
        break;
      case 'randow':
        playmode = 'loop';
        break;
      case 'loop':
        playmode = 'sequence';
        changePlayList(playList);
        break;
    }
    props.dispatch({
      type: 'music/setMode',
      payload: playmode,
    });
  };
  // 循环播放
  const loop = () => {
    if (audio) {
      audio.currentTime = 0;
    }
  };
  // 随机播放
  const changePlayList = (arr: any) => {
    const index = arr.findIndex((item: any) => {
      return item.id == music.id;
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      payload: { currentIndex: index },
    });
    // 设置随机播放列表
    props.dispatch({
      type: 'music/setRandowList',
      payload: { randowList: JSON.parse(JSON.stringify(arr)) },
    });
  };
  // 设置展示播放列表
  const showPlayList = () => {
    setVisible(true);
  };
  // 取消modal
  const handleCancel = () => {
    setVisible(false);
  };
  const toggleLove = () => {
    const index = loveIds.indexOf(id);
    if (index >= 0) {
      // 存在则取消删除
      loveIds.splice(index, 1);
      message.warning('接口限制，请转至网易云进行操作');
    } else {
      // 不存在添加到我喜欢
      loveIds.unshift(id);
      message.warning('接口限制，请转至网易云进行操作');
    }
    props.dispatch({
      type: 'user/setUserLoveIds',
      loveIds,
    });
  };
  return (
    <>
      {currentIndex == -1 ? (
        <></>
      ) : (
        <>
          <div className={styles.mimi_play}>
            <img
              src={music.al.picUrl}
              onClick={showPlayList}
              className={
                playing ? styles.play : `${styles.play} ${styles.pause}`
              }
            />
            <div className={styles.des}>
              <p className={styles.des_title}>
                <span className={styles.music_name}>{music.name}</span>
                <span className={styles.music_singer}>
                  {music.singer.map((item: { name: string; id: number }) => {
                    return <span key={item.id}>{item.name}</span>;
                  })}
                </span>
              </p>
              <div className={styles.des_progress}>
                <span>{formatCurrentTime(currentTime)}</span>
                <Progress
                  strokeColor={{
                    '0%': ' #ffcd32',
                    '100%': '#87d068',
                  }}
                  percent={formatPrecent(currentTime, music.dt)}
                  showInfo={false}
                />
                <span>{formatTime(music.dt)}</span>
              </div>
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
              <span
                className={`iconfont ${
                  loveIds.indexOf(id) >= 0 ? 'icon-love' : 'icon-aixin-xian'
                }`}
                onClick={toggleLove}
                style={{
                  color: loveIds.indexOf(id) >= 0 ? '#FF4D4F' : '#ffcd32',
                }}
              ></span>
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
              <span
                className="iconfont icon-1mulu"
                onClick={showPlayList}
              ></span>
            </div>
          </div>
          <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            width="1100px"
            wrapClassName="musicModal"
            zIndex={9}
          >
            <BigPlay
              changeMode={changeMode}
              changeMusic={changeMusic}
              playing={playing}
              togglePlay={togglePlay}
              songReady={songReady}
              currentTime={currentTime}
            ></BigPlay>
          </Modal>
          <div>
            <audio
              ref={audioRef}
              src={musicUrl}
              onCanPlay={playMusic}
              onTimeUpdate={timeUpdate}
              onEnded={endMusic}
              onError={error}
            ></audio>
          </div>
        </>
      )}
    </>
  );
};

export default connect(
  ({ music, user }: { music: MusicModelState; user: IndexModelState }) => ({
    music,
    user,
  }),
)(Index);
