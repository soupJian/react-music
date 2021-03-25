import { ImmerReducer } from 'umi';
export interface MusicModelState {
  playList: Array<any>;
  randowList: Array<any>;
  currentIndex: number;
  currentSong: object;
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
    setCurrentSong: ImmerReducer<MusicModelState>;
  };
}
const IndexModel: MusicModelType = {
  namespace: 'music',
  state: {
    playList: [],
    randowList: [], // 随即播放列表
    currentIndex: -1,
    currentSong: {
      id: -1,
    }, // 当前播放的歌曲
    playing: false, // 设置播放状态
    mode: 'sequence', // sequence 顺序播放 loop 循环播放 randow 随机播放
  },
  reducers: {
    // 设置播放列表
    setPlayList(state, action) {
      return {
        ...state,
        playList: action.playList,
      };
    },
    // 设置随机播放列表
    setRandowList(state, action) {
      return {
        ...state,
        randowList: action.randowList,
      };
    },
    // 当前歌曲播放索引
    setCurrentIndex(state, action) {
      let currentSong;
      if (action.currentIndex == -1) {
        currentSong = {
          id: -1,
        };
      } else {
        currentSong = state.randowList[action.currentIndex];
      }
      return {
        ...state,
        currentIndex: action.currentIndex,
        currentSong,
      };
    },
    setCurrentSong(state, action) {
      return { ...state, currentSong: action.currentSong };
    },
    // 设置播放状态
    setPlaying(state, action) {
      return { ...state, playing: action.playing };
    },
    // 设置播放模式
    setMode(state, action) {
      return { ...state, mode: action.payload };
    },
  },
};

export default IndexModel;
