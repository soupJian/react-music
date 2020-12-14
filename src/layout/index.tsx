import React, { useState, useEffect } from 'react';
import { Redirect, Link, connect, IndexModelState } from 'umi';
import { Layout, Menu, Input, Dropdown, Button } from 'antd';
import { propsType } from '../tsType/index';
import MiniPlay from '@/component/miniPlay/index';

import styles from './index.less';
import '../asset/font/iconfont.css';

const { Header, Sider, Content, Footer } = Layout;

function index(props: propsType) {
  const user = JSON.parse(JSON.stringify(props.user));
  if (props.location.pathname === '/me' && user.token == '') {
    return <Redirect to="/login"></Redirect>;
  }
  // 退出登录
  const loginOut = () => {
    const user = {
      nickname: '',
      userId: 0,
      avatarUrl: '',
      backgroundUrl: '',
      signature: '',
    };
    props.dispatch({
      type: 'user/setUser',
      user,
    });
    props.dispatch({
      type: 'user/setToken',
      payload: '',
    });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cookie');
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/me">个人中心</Link>
      </Menu.Item>
      <Menu.Item>
        <span onClick={loginOut}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  // 跳转到个人中心页
  const toSelf = () => {
    props.history.push('/me');
  };
  // 登陆成功后，选择下拉菜单
  const getMenuSelect = (pathname: string): string[] => {
    let selectKeys = [];
    selectKeys.push(pathname);
    return selectKeys;
  };
  return (
    <Layout style={{ minHeight: '100vh' }} className={styles.layout_wrap}>
      <Sider className={styles.sider}>
        <div className={styles.logo} onClick={toSelf}>
          <span className="iconfont icon-MusicAcc"></span>
          soupJian
        </div>
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
          <Menu.Item key="/me">
            <Link to="/me">个人中心</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.content}>
        <Header className={styles.content_header}>
          <Input
            placeholder="搜一下"
            prefix={<span className="iconfont icon-search"></span>}
            className={styles.header_input}
          />
          {user.token === 'true' ? (
            <div className={styles.login}>
              <img src={props.user.user_detail.avatarUrl} alt="" />
              <Dropdown
                overlay={menu}
                placement="bottomCenter"
                arrow
                overlayClassName={styles.dropdownSelect}
              >
                <a onClick={e => e.preventDefault()} className={styles.drop_a}>
                  {props.user.user_detail.nickname}
                </a>
              </Dropdown>
            </div>
          ) : (
            <div className={styles.login}>
              <Link to="/login">登录/注册</Link>
            </div>
          )}
        </Header>
        <Content>
          <div>{props.children}</div>
        </Content>
        <Footer className={styles.content_footer}>
          <MiniPlay></MiniPlay>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default connect(({ user }: { user: IndexModelState }) => ({
  user,
}))(index);
