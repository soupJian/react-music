import React, { useState, useEffect } from 'react';
import { Link, connect, IndexModelState } from 'umi';
import { propsType } from '../../tsType/index';
import SongList from '@/component/songList/index';
import styles from './index.less';
import { request, requestCookie } from '@/api/index';
const index = (props: propsType) => {
  const user_detail = props.user.user_detail;
  const uid = user_detail.userId;
  const [playlist, setPlaylist] = useState([] as []);
  const [follows, setFollows] = useState([] as []);
  useEffect(() => {
    getPlaylist();
    getAttention();
  }, []);
  // 获取用户歌单列表
  const getPlaylist = async () => {
    const result = await request({
      url: `/user/playlist`,
      data: `uid=${uid}`,
    });
    setPlaylist(result.data.playlist);
  };
  // 获取用户关注列表
  const getAttention = async () => {
    const result = await request({
      url: '/user/follows',
      data: `uid=${uid}`,
    });
    setFollows(result.data.follow);
  };
  return (
    <div>
      <div className={styles.me_header}>
        <img src={user_detail.avatarUrl} alt="" />
        <div className={styles.user_detail}>
          <p className={styles.nickname}>{user_detail.nickname}</p>
          {/* <p className={styles.tabItem}>
                        <Link to="#">歌单()</Link>
                        <Link to="#">关注()</Link>
                        <Link to="#">粉丝()</Link>
                    </p> */}
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
