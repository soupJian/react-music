import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import { connect, IndexModelState } from 'umi';
import { USER_PLAYlIST } from '@/services/me/index';
import { userType } from '@/services/me/type';
import { playListype } from '@/services/song/type';
import SongList from '@/component/songList/index';
import styles from './index.less';
interface props {
  user: IndexModelState;
}
const index = (props: props) => {
  const user: userType | null = props.user.user_detail;
  const [playlist, setPlaylist] = useState<playListype[]>([]);
  // const [follows, setFollows] = useState([] as []);
  useEffect(() => {
    getPlaylist();
    // getAttention();
  }, []);
  // 获取用户歌单列表
  const getPlaylist = async () => {
    if (!user) {
      return;
    }
    const res = await USER_PLAYlIST(user.userId);
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
    <>
      {user ? (
        <>
          <div className={styles.me_header}>
            <Image src={user.avatarUrl} />
            <div className={styles.user_detail}>
              <p className={styles.nickname}>{user.nickname}</p>
              <p>{user.signature}</p>
            </div>
          </div>
          <div className={styles.me_list_header}>我的歌单</div>
          <div className={styles.me_list}>
            <SongList songList={playlist}></SongList>
          </div>
        </>
      ) : null}
    </>
  );
};

export default connect(({ user }: { user: IndexModelState }) => ({
  user,
}))(index);
