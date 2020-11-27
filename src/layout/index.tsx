import React from 'react'
import { Layout, Menu,Input } from 'antd';
import styles from './index.less'
import '../asset/font/iconfont.css'
import {Link} from 'umi'
const { Header, Sider, Content } = Layout;
function index(props:{children: React.ReactNode}) {
    return (
        <Layout className={styles.layout_wrap}>
            <Sider className={styles.sider}>
                <div className={styles.logo}>
                    <span className="iconfont icon-MusicAcc"></span>
                    soupJian
                </div>
                <Menu theme="dark" mode="inline"defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/recommend">热门推荐</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/singer">分类歌手</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/rank">排行榜单</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/search">觅柳寻花</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/me">个人中心</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={styles.content}>
                <Header className={styles.content_header}>
                    <Input placeholder="搜一下" prefix={<span className="iconfont icon-search"></span>} className={styles.header_input}/>
                    <a className={styles.login}>登录</a>
                </Header>
                <Content>
                    <div>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default index
