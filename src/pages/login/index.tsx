import React, { ChangeEventHandler, useState } from 'react';
import { connect, IndexModelState, Loading } from 'umi';
import { Tabs, Form, Input, Button, Checkbox, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './index.less';
import { request } from '@/api/index';
import Axios from 'axios';

const { TabPane } = Tabs;
const { Search } = Input;

interface formType {
  password: string;
  phoneNumber: string;
  remember?: boolean;
}
interface registerForm {
  code: string;
  password: string;
  phoneNumber: string;
}

const Index = (props: any) => {
  const [codeMessage, setCodeMessage] = useState<string>('获取验证码');
  const changeForm = React.createRef<FormInstance>();
  const submitLogin = async (e: formType) => {
    const phone = e.phoneNumber; // 登录时候
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
        props.history.replace('/me');
      } else {
        message.error('密码错误');
      }
    } else {
      // 手机号未注册
      message.warning('手机号暂未注册，清洗注册');
    }
  };
  // 修改密码
  let registerPhone = ''; // 用户修改密码输入的手机号
  const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerPhone = e.target.value;
  };
  // 获取验证码
  const getCode = () => {
    const reg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g;
    if (!reg.test(registerPhone)) {
      message.error('请输入手机号');
      return;
    }
    request({
      url: `/captcha/sent?phone=${registerPhone}`,
    });
    message.success('验证码已发送，请注意查收');
  };
  // 点击修改密码
  const submitRegister = (e: registerForm) => {
    // const
    const code = e.code;
    const password = e.password;
    const phoneNumber = e.phoneNumber;
    request({
      url: `/captcha/verify?phone=${phoneNumber}&captcha=${code}`,
    }).then((res: { data: { data: Boolean } }) => {
      if (res.data.data) {
        request({
          url: `/register/cellphone?phone=${phoneNumber}&password=${password}&captcha=${code}`,
        });
        message.success('修改密码成功');
        changeForm.current!.resetFields();
      } else {
        message.success('验证码错误');
      }
    });
  };
  return (
    <div className={styles.login}>
      <Tabs defaultActiveKey="login" className={styles.login_Tabs}>
        <TabPane tab="手机号登录" key="login">
          <Form onFinish={submitLogin} ref={changeForm}>
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
        <TabPane tab="修改密码" key="change">
          <Form onFinish={submitRegister}>
            {/* <Form.Item
              name="nicknme"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item> */}
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
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="请输入手机号"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhone(e);
                }}
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
                修改密码
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
