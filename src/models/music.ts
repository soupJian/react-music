import { ImmerReducer } from 'umi';
export interface MusicModelState {
  playList: Array<any>;
  randowList: Array<any>;
  currentIndex: number;
  playing: boolean;
  mode: string;
}
export interface MusicModelType {
  namespace: 'music';
  state: MusicModelState;
  reducers: {
    setPlaying: ImmerReducer<MusicModelState>;
    setRandowList: ImmerReducer<MusicModelState>;
    setMode: ImmerReducer<MusicModelState>;
    setPlayList: ImmerReducer<MusicModelState>;
    setCurrentIndex: ImmerReducer<MusicModelState>;
  };
}
const IndexModel: MusicModelType = {
  namespace: 'music',
  state: {
    playList: [],
    randowList: [], // 随即播放列表
    currentIndex: -1,
    playing: false, // 设置播放状态
    mode: 'sequence', // sequence 顺序播放 loop 循环播放 randow 随机播放
  },
  reducers: {
    // 设置播放列表
    setPlayList(state, action) {
      return { ...state, ...action.payload };
    },
    // 设置随机播放列表
    setRandowList(state, action) {
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
    setMode(state, action) {
      return { ...state, mode: action.payload };
    },
  },
};

export default IndexModel;