export interface baseSingerType {
  id: number;
  name: string;
}

// 歌手列表
export interface singerListType extends baseSingerType {
  picUrl: string;
}
// 歌手详情
export interface singerType extends singerListType {
  albumSize: number;
  mvSize: number;
  musicSize: number;
  briefDesc: string;
  alias: string[];
  publishTime: number;
}
