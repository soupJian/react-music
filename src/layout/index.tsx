import React, { useEffect } from 'react';
import { Link, connect, IndexModelState, MusicModelState, history } from 'umi';
import { Layout, Menu, Dropdown } from 'antd';
import { LOVE_LIST, LOGIN_OUT } from '@/services/layout/index';
import MiniPlay from '@/component/miniPlay/index';
import SearchInput from '@/component/search/index';
import styles from './index.less';
import '../asset/font/iconfont.css';

const { Header, Sider, Content, Footer } = Layout;
const unloginImg = require('../asset/img/unlogin.png');
interface props {
  location: {
    pathname: string;
  };
  music: MusicModelState;
  user: IndexModelState;
  dispatch: Function;
  children: React.ReactElement;
}
function index(props: props) {
  const user: IndexModelState = JSON.parse(JSON.stringify(props.user));
  if (props.location.pathname === '/me' && !user.user_detail) {
    history.replace('/login');
  }
  // 获取用户收藏的歌曲id列表
  useEffect(() => {
    if (!user.user_detail) {
      return;
    }
    getLove(user.user_detail.userId);
  }, [user.user_detail]);
  // 退出登录
  const loginOut = async () => {
    await LOGIN_OUT();
    localStorage.clear();
    sessionStorage.clear();
    props.dispatch({
      type: 'user/loginout',
    });
    props.dispatch({
      type: 'music/loginout',
    });
    history.replace('/recommend');
  };
  // 用户登录成功后 获取 喜欢的音乐
  const getLove = async (id: number) => {
    const result: number[] = await LOVE_LIST(id);
    props.dispatch({
      type: 'user/setUserLoveIds',
      loveIds: result,
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key="me">
        <Link to="/me">个人中心</Link>
      </Menu.Item>
      <Menu.Item key="out">
        <span onClick={loginOut}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  // 跳转到个人中心页
  const toSelf = () => {
    history.push('/me');
  };
  // 登陆成功后，选择下拉菜单
  const getMenuSelect = (pathname: string): string[] => {
    let selectKeys = [];
    selectKeys.push(pathname);
    return selectKeys;
  };
  return (
    <Layout className={styles.layout_wrap}>
      <Header className={styles.commonHeader}>
        <div className={styles.logo} onClick={toSelf}>
          <span
            className="iconfont icon-MusicAcc"
            style={{ fontSize: '24px', marginRight: '10px' }}
          ></span>
          soupJian
        </div>
        <div className={styles.headeRight}>
          <SearchInput></SearchInput>
          <img
            src={(user.user_detail && user.user_detail.avatarUrl) || unloginImg}
            alt=""
          />
          {user.user_detail ? (
            <Dropdown
              overlay={menu}
              placement="bottom"
              arrow
              overlayClassName={styles.dropdownSelect}
            >
              <a onClick={e => e.preventDefault()} className={styles.userName}>
                {user.user_detail.nickname}
              </a>
            </Dropdown>
          ) : (
            <div className={styles.userName}>
              <Link to="/login">登录</Link>
            </div>
          )}
        </div>
      </Header>
      <Layout>
        <Sider className={styles.sider}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getMenuSelect(props.location.pathname)}
          >
            <Menu.Item key="/recommend">
              <Link to="/recommend">热门推荐</Link>
            </Menu.Item>
            <Menu.Item key="/singer">
              <Link to="/singer">分类歌手</Link>
            </Menu.Item>
            <Menu.Item key="/rank">
              <Link to="/rank">排行榜单</Link>
            </Menu.Item>
            <Menu.Item key="/mv">
              <Link to="/mv">精彩MV</Link>
            </Menu.Item>
            <Menu.Item key="/me">
              <Link to="/me">个人中心</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          className={styles.content}
          style={{ bottom: `${props.music.currentSong ? '44px' : '0'}` }}
        >
          <div className={styles.container}>{props.children}</div>
        </Content>
      </Layout>
      {props.music.currentSong ? (
        <Footer className={styles.footer}>
          <MiniPlay></MiniPlay>
        </Footer>
      ) : null}
    </Layout>
  );
}

export default connect(
  ({ music, user }: { music: MusicModelState; user: IndexModelState }) => ({
    music,
    user,
  }),
)(index);
