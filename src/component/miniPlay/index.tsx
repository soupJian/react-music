import React, { useState, useEffect, useRef } from 'react';
import { Slider, Modal, message } from 'antd';
import { songItemType } from '@/api/interface';
import { connect, MusicModelState, IndexModelState } from 'umi';
import { shuffle } from '@/utils/common';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import './modal.less';
import { getMusicUrl } from '@/api/api';
import { musicUrl } from '@/api/interface';
import { formatTime, formatCurrentTime, formatPrecent } from '@/utils/common';
import BigPlay from '../bigPlay/index';
interface props {
  user: IndexModelState;
  music: MusicModelState;
  dispatch: Function;
}
const Index = (props: props) => {
  const loveIds = JSON.parse(JSON.stringify(props.user.loveIds));
  const randowList: songItemType[] = JSON.parse(
    JSON.stringify(props.music.randowList),
  );
  const currentIndex: number = props.music.currentIndex;
  const mode: string = props.music.mode;
  const currentSong: songItemType | null = props.music.currentSong;
  const playing: boolean = props.music.playing;
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current || null;
  const [currentTime, setCurrentTime] = useState<number>(0);
  // 获取歌曲url,watch id来处理事务
  const [musicUrl, setMusicUrl] = useState<string>('');
  // 判断歌曲是否可以准备播放
  const [songReady, setSongReady] = useState<boolean>(false);
  // 是否展示大小播放器
  const [visible, setVisible] = useState<boolean>(false);
  // 设置当前歌曲播放进度
  const [precent, setPrecent] = useState<number>(0);
  useEffect(() => {
    if (currentSong) {
      getMusicSrc();
    }
  }, [currentSong && currentSong.id]);
  // 获取歌曲播放地址
  const getMusicSrc = async () => {
    if (!currentSong) {
      return;
    }
    const result: musicUrl[] = await getMusicUrl(currentSong.id);
    if (!result[0].url) {
      message.warning('暂无播放地址，自动切换下一首');
      changeMusic(1);
    }
    // 设置歌曲播放地址
    setMusicUrl(result[0].url);
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
  const timeUpdate = () => {
    if (audio && currentSong) {
      setCurrentTime(audio.currentTime);
      setPrecent(formatPrecent(audio.currentTime, currentSong.dt));
    }
  };
  // endMusic 歌曲结束
  const endMusic = () => {
    if (mode == 'loop' || randowList.length == 1) {
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
      currentIndex: index,
    });
  };
  // 上一首  下一首
  const changeMusic = (action: number) => {
    if (mode == 'loop' || randowList.length == 1) {
      loop();
      return;
    }
    let index;
    if (action == -1) {
      // 上一首
      index = currentIndex - 1;
      if (index < 0) {
        index = randowList.length - 1;
      }
    } else {
      // 下一首
      index = currentIndex + 1;
      if (index >= randowList.length) {
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
        changePlayList(shuffle(randowList));
        break;
      case 'randow':
        playmode = 'loop';
        break;
      case 'loop':
        playmode = 'sequence';
        changePlayList(randowList);
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
  const changePlayList = (arr: songItemType[]) => {
    if (!currentSong) {
      return;
    }
    // 设置随机播放列表
    props.dispatch({
      type: 'music/setRandowList',
      randowList: JSON.parse(JSON.stringify(arr)),
    });
    const index = arr.findIndex((item: songItemType) => {
      return item.id == currentSong.id;
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      currentIndex: index,
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
    if (!currentSong) {
      return;
    }
    const index = loveIds.indexOf(currentSong.id);
    if (index >= 0) {
      // 存在则取消删除
      loveIds.splice(index, 1);
      message.warning('接口限制，请转至网易云进行操作');
    } else {
      // 不存在添加到我喜欢
      loveIds.unshift(currentSong.id);
      message.warning('接口限制，请转至网易云进行操作');
    }
    props.dispatch({
      type: 'user/setUserLoveIds',
      loveIds,
    });
  };
  const slideChange = (value: number) => {
    if (!currentSong) {
      return;
    }
    const time = (currentSong.dt * value) / 100;
    if (audio) {
      audio.currentTime = time / 1000;
    }
  };
  return (
    <>
      {currentSong ? (
        <>
          <div className={styles.mimi_play}>
            <img
              src={currentSong.al.picUrl}
              onClick={showPlayList}
              className={
                playing ? styles.play : `${styles.play} ${styles.pause}`
              }
            />
            <div className={styles.des}>
              <p className={styles.des_title}>
                <span className={styles.music_name}>{currentSong.name}</span>
                <span className={styles.music_singer}>
                  {currentSong.ar.map((item: { name: string; id: number }) => {
                    return <span key={item.id}>{item.name}</span>;
                  })}
                </span>
              </p>
              <div className={styles.des_slider}>
                <span>{formatCurrentTime(currentTime)}</span>
                <Slider
                  value={precent}
                  onChange={slideChange}
                  // onAfterChange={slideChange}
                  tipFormatter={null}
                />
                <span>{formatTime(currentSong.dt)}</span>
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
                  loveIds.indexOf(currentSong.id) >= 0
                    ? 'icon-love'
                    : 'icon-aixin-xian'
                }`}
                onClick={toggleLove}
                style={{
                  color:
                    loveIds.indexOf(currentSong.id) >= 0
                      ? '#FF4D4F'
                      : '#ea8011',
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
              closeModal={handleCancel}
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
      ) : null}
    </>
  );
};

export default connect(
  ({ music, user }: { music: MusicModelState; user: IndexModelState }) => ({
    music,
    user,
  }),
)(Index);
