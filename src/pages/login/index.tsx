import React, { useState } from 'react';
import { connect, IndexModelState, Loading } from 'umi';
import { Tabs, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import { request } from '@/api/index';

const { TabPane } = Tabs;
const { Search } = Input;

interface formType {
  password: string;
  phoneNumber: string;
  remember?: boolean;
}

const Index = (props: any) => {
  const [codeMessage, setCodeMessage] = useState<string>('获取验证码');
  const submitLogin = async (e: formType) => {
    const phone = e.phoneNumber;
    const password = e.password;
    const remember = e.remember;
    // 1. 检查手机号是否注册
    const checkPhone = await request({
      url: `/cellphone/existence/check?phone=${phone}`,
    });
    // 手机号已经注册
    if (checkPhone.data.exist == 1) {
      // 登录
      const result = await request({
        url: `/login/cellphone?phone=${phone}&password=${password}`,
      });
      if (result.data.code && result.data.code == 200) {
        const user = {
          nickname: result.data.profile.nickname,
          userId: result.data.profile.userId,
          avatarUrl: result.data.profile.avatarUrl,
          backgroundUrl: result.data.profile.backgroundUrl,
          signature: result.data.profile.signature,
        };
        props.dispatch({
          type: 'user/setUser',
          user,
        });
        props.dispatch({
          type: 'user/setToken',
          payload: 'true',
        });
        // 如果登陆成功，判断是否记住密码,也就是记住用户登陆状态
        if (remember) {
          // 记住密码
          localStorage.setItem('token', 'true'),
            localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('token', 'true');
          sessionStorage.setItem('user', JSON.stringify(user));
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        localStorage.setItem('cookie', result.data.cookie);
        message.success('登陆成功');
        props.history.replace('/recommend');
      } else {
        message.error('密码错误');
      }
    } else {
      // 手机号未注册
      message.warning('手机号暂未注册，清洗注册');
    }
  };

  const submitRegister = (e: formType) => {
    console.log(e);
  };
  const getCode = () => {
    console.log('获取验证码');
  };
  return (
    <div className={styles.login}>
      <Tabs defaultActiveKey="login" className={styles.login_Tabs}>
        <TabPane tab="手机号登录" key="login">
          <Form onFinish={submitLogin}>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g,
                  message: '请输入正确的手机号',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入手机号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
              <a className={styles.forget} href="#">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.login_button}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="账号注册" key="register">
          <Form onFinish={submitRegister}>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g,
                  message: '请输入正确的手机号',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入手机号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="code"
              className={styles.register_code}
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Search
                placeholder="请输入验证码"
                enterButton={codeMessage}
                onSearch={getCode}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.login_button}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default connect(
  ({ user, loading }: { user: IndexModelState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(Index);
