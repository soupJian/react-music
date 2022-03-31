import { userPlayListType } from '@/services/me/type';
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
  playlists?: userPlayListType[];
  order?: string[]; // ["songs", "artists", "albums", "playlists"]
}
