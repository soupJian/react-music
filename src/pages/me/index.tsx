import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import { getUserPlayList } from '@/api/api';
import { playListItemType } from '@/api/interface';
import { connect, IndexModelState } from 'umi';
import SongList from '@/component/songList/index';
import styles from './index.less';
interface props {
  user: IndexModelState;
}
const index = (props: props) => {
  const user_detail = props.user.user_detail;
  const uid = user_detail.userId;
  const [playlist, setPlaylist] = useState<playListItemType[]>([]);
  // const [follows, setFollows] = useState([] as []);
  useEffect(() => {
    getPlaylist();
    // getAttention();
  }, []);
  // 获取用户歌单列表
  const getPlaylist = async () => {
    const res: playListItemType[] = await getUserPlayList(uid);
    setPlaylist(res);
  };
  // 获取用户关注列表
  const getAttention = async () => {
    // const result = await request({
    //   url: '/user/follows',
    //   data: `uid=${uid}`,
    // });
    // setFollows(result.data.follow);
  };
  return (
    <div>
      <div className={styles.me_header}>
        <Image src={user_detail.avatarUrl} />
        <div className={styles.user_detail}>
          <p className={styles.nickname}>{user_detail.nickname}</p>
          <p>{user_detail.signature}</p>
        </div>
      </div>
      <div className={styles.me_list_header}>我的歌单</div>
      <div className={styles.me_list}>
        <SongList songList={playlist}></SongList>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: IndexModelState }) => ({
  user,
}))(index);
