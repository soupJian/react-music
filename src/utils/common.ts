import { lyricItem } from '@/services/music/type';
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

export const parseLyric = (lyric: string) => {
  let lines = lyric.split('\n'), //将文本按行分隔，存入数组
    pattern = /\[\d*:\d*((\.|\:)\d*)*\]/g, //正则表达式
    result: lyricItem[] = []; //保存最终结果的数组
  lines.forEach((item: any) => {
    let time = item.match(pattern), //返回与正则匹配的字符串的数组，正则中有/g，为全部
      value: string = item.replace(pattern, ''); //提取歌词
    if (time && value != '') {
      let t = time[0].slice(1, -1).split(':'); //去掉时间里的中括号并分割
      if (t.length === 3) {
        //[00:00:00]
        result.push({
          time:
            parseInt(t[0], 10) * 60 + parseInt(t[1]) + parseFloat('0.' + t[2]),
          line: value,
          currentLine: false,
          next: null,
          before: null,
        }); //最终数组
      } else {
        result.push({
          time: parseInt(t[0], 10) * 60 + parseFloat(t[1]),
          line: value,
          currentLine: false,
          next: null,
          before: null,
        });
      }
    }
  });
  result.forEach((item, index) => {
    if (index == 0) {
      item.next = result[index + 1].time;
    } else if (index == result.length - 1) {
      item.before = result[index - 1].time;
    } else {
      item.before = result[index - 1].time;
      item.next = result[index + 1].time;
    }
  });
  return result;
};

export const formatNum = (num: number) => {
  return num > 10 ? num : `0${num}`;
};
export const formatDate = (time: number) => {
  const date = new Date(time);
  const year = date.getFullYear(); // 年
  const month = date.getMonth() + 1; // 月
  const day = date.getDate(); // 日 获取日是 getDate()方法 区别于 getDay()是星期
  return `${year}-${formatNum(month)}-${formatNum(day)}`;
};
