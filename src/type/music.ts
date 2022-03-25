// 歌手基本信息
export interface singer {
  id: number; // id
  name: string; // 昵称
  briefDesc: string; // 基本信息
  musicSize: string; // 音乐数
  mvSize: string; //, MV数
  albumSize: string; // 专辑数
  picUrl: string; // 头像
}

// 歌曲的歌手名称数组
export interface singerArray {
  id: number;
  name: string;
}

export interface InterfaceSong {
  id: number;
  name: string;
  al: {
    picUrl: string; // 歌曲专辑图片
  };
  ar: singerArray[];
  dt: number;
}

// 歌曲数组
export interface songArray {
  id: number; // 歌曲id
  name: string; // 歌曲名
  picUrl: ''; // 专辑封面 al.picUrl
  singer: singerArray[]; // 歌手 ar[]
  dt: number; // 歌曲时长
}
