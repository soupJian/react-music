import { ImmerReducer } from 'umi';
export interface MusicModelState {
  playList: Array<any>;
  currentIndex: number;
  playing: boolean;
  mode: {
    sequence: boolean;
    loop: boolean;
    randow: boolean;
  };
}
export interface MusicModelType {
  namespace: 'music';
  state: MusicModelState;
  reducers: {
    setPlaying: ImmerReducer<MusicModelState>;
    setMode: ImmerReducer<MusicModelState>;
    setPlayList: ImmerReducer<MusicModelState>;
    setCurrentIndex: ImmerReducer<MusicModelState>;
  };
}
const IndexModel: MusicModelType = {
  namespace: 'music',
  state: {
    playList: [],
    currentIndex: -1,
    playing: false, // 设置播放状态
    mode: {
      sequence: true, // 顺序播放
      loop: false, // 循环播放
      randow: false, // 随机播放
    },
  },
  reducers: {
    // 设置播放列表
    setPlayList(state, action) {
      return { ...state, ...action.payload };
    },
    // 当前歌曲播放索引
    setCurrentIndex(state, action) {
      return { ...state, ...action.payload };
    },
    // 设置播放状态
    setPlaying(state, action) {
      return { ...state, playing: action.playing };
    },
    // 谁知播放模式
    setMode(state) {
      return { ...state };
    },
  },
};

export default IndexModel;
