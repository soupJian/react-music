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
// 用户创建的歌单
/**
 * 区别月普通个单列表 coverImgUrl和picUrl
 */
export interface userPlayListItemType {
  id: number;
  name: string;
  coverImgUrl: string;
  playCount: number;
}
