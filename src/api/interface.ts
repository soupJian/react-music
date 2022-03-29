// 轮播图
export interface bannerItemType {
  imageUrl: string;
}
// 热门推荐 ---- 歌单展示数组
export interface playListItemType {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}
// 歌手列表
export interface singerListItemType {
  id: number;
  picUrl: string;
  name: string;
}
// 歌手详情
export interface singerDetailType extends singerListItemType {
  albumSize: number;
  mvSize: number;
  musicSize: number;
  briefDesc: string;
}
export interface singerArray {
  id: number;
  name: string;
}
// 歌单列表每首歌
export interface songItemType {
  name: string;
  dt: number;
  id: number;
  ar: singerArray[];
  al: {
    id: number;
    picUrl: string;
  };
}
/**
 * 用户创建的歌单
 * 区别月普通个单列表 coverImgUrl和picUrl
 */
export interface userPlayListItemType {
  id: number;
  name: string;
  coverImgUrl: string;
  playCount: number;
}

export interface rankTrackItem {
  first: string;
  second: string;
}

export interface rankListItemType {
  id: number;
  tracks: rankTrackItem[];
  updateFrequency: string;
  coverImgUrl: string;
  trackCount: number;
  description: string;
  name: string;
}
export interface songDetailType extends rankListItemType {
  tags: string[];
  shareCount: number; // 芬妮像次数
  playCount: number; // 播放次数
  subscribedCount: number; // 订阅次数
}
export interface musicUrl {
  id: number;
  url: string;
}

export interface lycType {
  nolyric?: boolean;
  lrc?: {
    lyric: string;
  };
}
export interface userType {
  nickname: string;
  userId: number;
  avatarUrl: string;
  signature: string;
}

export interface hotSearchType {
  searchWord: string;
  score: number;
  iconUrl: string | null;
}

export interface searchArtistType {
  id: number;
  name: string;
  picUrl: string;
}
export interface searchAlbumType {
  artist: searchArtistType;
  name: string;
  id: number;
}
export interface searchSongType {
  album: searchAlbumType;
  artists: searchArtistType[];
  id: number;
  name: string;
  duration: number;
}

export interface searchResultType {
  songs?: searchSongType[];
  albums?: searchAlbumType[];
  artists?: searchArtistType[];
  playlists?: userPlayListItemType[];
  order?: string[]; // ["songs", "artists", "albums", "playlists"]
}
