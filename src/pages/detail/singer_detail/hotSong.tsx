import React from 'react';
import { Table } from 'antd';
import { songArray } from '@/type/music';
import styles from './hotSong';
interface props {
  hotSongs: songArray[] | null;
}
const hotSong = (props: props) => {
  console.log(props.hotSongs);

  return <div>hotSong</div>;
};

export default hotSong;
