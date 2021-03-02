import React, { useEffect, useState, useRef } from 'react';
import { connect, MusicModelState } from 'umi';
import styles from './index.less';
import '../../asset/font/iconfont.css';
import { songItemType } from '../../tsType/index';
import { request } from '../../api/index';
import { parseLyric } from '../../common/common_ts/index';
const Index = (props: any) => {
  const playList = props.music.playList;
  const randowList = props.music.randowList;
  const songReady = props.songReady;
  const playing = props.playing;
  const mode = props.music.mode;
  const currentIndex = props.music.currentIndex;
  const music = randowList[currentIndex];
  const currentTime = props.currentTime;
  const lyric_wrap = useRef<HTMLDivElement>(null);
  const [scrollFlag, setScrollFlag] = useState(false); // 是否允许手动滚动
  const [lyric, setLyric] = useState('');
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
  useEffect(() => {
    getLyric();
    scrollTop(0);
  }, [music.id]);
  const getLyric = async () => {
    const result = await request({
      url: `/lyric?id=${music.id}`,
    });
    if (result.data.nolyric) {
    } else {
      setLyric(result.data.lrc.lyric);
    }
  };
  // scroll自动滚动距离
  const scrollTop = (i: number) => {
    if (scrollFlag) {
      return;
    }
    if (lyric_wrap.current) {
      const lyric_Div = lyric_wrap.current;
      lyric_Div.scrollTop = (i - 5) * 22; // 22 是每一个p的高度
    }
  };
  // 解析歌词为歌词和时间的对象
  const lyricObj = parseLyric(lyric);

  // 防止歌词中出现空，导致滚动出乱
  lyricObj.forEach((item: { line: String }, index) => {
    if (item.line == '') {
      lyricObj.splice(index, 1);
    }
  });
  if (lyricObj.length > 0) {
    for (let i = 0; i <= lyricObj.length - 1; i++) {
      if (
        i != lyricObj.length - 1 &&
        lyricObj[i + 1].time == lyricObj[i].time
      ) {
        lyricObj[i + 1].time += 0.0000001;
      }
      if (
        i != lyricObj.length - 1 &&
        lyricObj[i].time <= currentTime &&
        lyricObj[i + 1].time > currentTime
      ) {
        // 设置当前播放歌词
        lyricObj[i].currentLine = true;
        if (i > 5) {
          scrollTop(i);
        }
      } else {
        lyricObj[i].currentLine = false;
      }
    }
  }
  // 鼠标移出继续动画
  const continueScroll = () => {
    // console.log("鼠标移出");
    setScrollFlag(false);
  };
  // 鼠标滚动歌词事件
  const lyricWheel = () => {
    // console.log("滚动");
    setScrollFlag(true);
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
        <div
          className={styles.lyric}
          ref={lyric_wrap}
          onMouseLeave={continueScroll}
          onWheel={lyricWheel}
        >
          {lyricObj.map(
            (item: { line: string; time: string; currentLine: boolean }) => {
              return (
                <p
                  key={item.time}
                  style={{
                    color: item.currentLine
                      ? '#fff'
                      : ' rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {item.line}
                </p>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
