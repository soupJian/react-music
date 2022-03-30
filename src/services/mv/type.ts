export interface mvType {
  id: number;
  name: string;
  cover: string;
  artists: {
    id: number;
    name: string;
  }[];
  playCount: number;
}

export interface mvDetail {
  name: string;
  desc: string;
  artistName: string;
  playCount: number;
  publishTime: number;
}
