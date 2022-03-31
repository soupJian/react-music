import { baseSingerType } from '@/services/singer/type';
// 歌单展示数组
export interface playListype {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}
// 歌单列表每首歌
export interface songType {
  name: string;
  dt: number;
  id: number;
  ar: baseSingerType[];
  al: {
    id: number;
    picUrl: string;
  };
}

export interface track {
  first: string;
  second: string;
}
export interface rankListType {
  id: number;
  tracks: track[];
  updateFrequency: string;
  coverImgUrl: string;
  trackCount: number;
  description: string;
  name: string;
}
export interface songDetailType extends rankListType {
  tags: string[];
  shareCount: number; // 分享次数
  playCount: number; // 播放次数
  subscribedCount: number; // 订阅次数
}
