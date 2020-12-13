// 处理歌曲时间问题
export const formatTime = (time: number) => {
  let minute = Math.floor(time / 1000 / 60);
  let second = Math.floor(time / 1000 - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
};
// audio的当前时间处理问题
export const formatCurrentTime = (time: number) => {
  // 解决时间显示问题
  time = time | 0;
  const minute = (time / 60) | 0;
  const second = time % 60 | 0;
  if (second < 10) return `${minute}:0${second}`;
  return `${minute}:${second}`;
};
// 计算进度条比例
export const formatPrecent = (currentTime: number, total: number) => {
  const precent = (currentTime / (total / 1000)) * 100;
  return precent;
};
// 数组乱序
export const shuffle = (arr: any) => {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
};
