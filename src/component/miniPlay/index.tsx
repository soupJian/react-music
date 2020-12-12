import React, { useState, useEffect, useRef } from 'react';
import { Progress } from 'antd';
import { connect, MusicModelState } from 'umi';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import { request } from '../../api/index';
import {
  formatTime,
  formatCurrentTime,
  formatPrecent,
} from '../../common/common_ts/index';
const Index = (props: any) => {
  const playList = props.music.playList;
  const currentIndex = props.music.currentIndex;
  const music = playList[currentIndex];
  const playing = props.music.playing;
  const id: number = currentIndex == -1 ? 0 : music.id;
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current || null;
  // 设置播放暂停按钮ICON
  const [icon, setIcon] = useState('icon-Pause');
  const [currentTime, setCurrentTime] = useState(0);
  // 获取歌曲url,watch id来处理事务
  const [musicUrl, setMusicUrl] = useState<string>('');
  const [songReady, setSongReady] = useState(false);
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
  // dispatch --- playing
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
        setIcon('icon-play');
      } else {
        setPlaying(true);
        audio.play();
        setIcon('icon-Pause');
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
  const endMusic = () => {};
  // error 歌曲加载错误
  const error = () => {
    // 出现错误，播放按钮灰色
    setSongReady(false);
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
              alt=""
              className={
                playing ? styles.play : `${styles.play} ${styles.pause}`
              }
            />
            <div className={styles.des}>
              <p className={styles.des_title}>
                <span className={styles.music_name}>{music.name}</span>
                <span className={styles.music_singer}>
                  {music.singer.map((item: any, index: number) => {
                    return <span key={index}>{item}</span>;
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
              <span className="iconfont icon-sequence"></span>
              <span className="iconfont icon-aixin-xian"></span>
              <span className="iconfont icon-previous"></span>
              <span
                className={`iconfont ${icon} ${
                  songReady ? '' : styles.disabled
                }`}
                style={{ fontSize: '28px' }}
                onClick={togglePlay}
              ></span>
              <span className="iconfont icon-next"></span>
              <span className="iconfont icon-1mulu"></span>
            </div>
          </div>
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

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
