import { IndexModelState, MusicModelState } from 'umi';
// 定义用户信息
export interface userType {
  nickname: string;
  userId: number;
  avatarUrl: string;
  backgroundUrl: string;
  signature: string;
}
// props
export interface propsType {
  children: React.ReactNode;
  user: IndexModelState;
  music: MusicModelState;
  dispatch: any;
  location: {
    pathname: string;
  };
  history: any;
  match?: any;
  songitemlist: [];
}

// 歌单 item
export interface SongListItem {
  copywriter: string;
  id: number;
  name: string;
  picUrl?: string;
  playCount: number;
  coverImgUrl?: string;
}
export interface playlistType {
  name: string;
  coverImgUrl: string;
  description: string;
  tracks: [];
}
// 歌单歌手专辑右侧的相似歌手
export interface similist {
  id: number;
  name: string;
  coverImgUrl: string;
  updateFrequency?: string; // 歌单更新时间
}
// 每首歌
export interface songItemType {
  name: string;
  dt: number;
  id: number;
  ar: [];
  al: {
    id: number;
    picUrl: string;
  };
}
