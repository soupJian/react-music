export interface musicUrlType {
  id: number;
  url: string;
}
export interface lycType {
  nolyric?: boolean;
  lrc?: {
    lyric: string;
  };
}
export interface lyricItem {
  time: number;
  line: string;
  currentLine: boolean;
  next: number | null;
  before: number | null;
}
