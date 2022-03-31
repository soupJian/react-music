import React, { useState } from 'react';
import { connect, IndexModelState, Loading, history } from 'umi';
import { Tabs, Form, Input, Button, Checkbox, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  CHECK_PHONE,
  LOGIN,
  CODE,
  CHECK_CODE,
  CHANGE_PASSWORD,
} from '@/services/login/index';
import styles from './index.less';

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
interface props {
  dispatch: Function;
}
const CODE_MESSAGE = '获取验证码';

const Index = (props: props) => {
  const [codeMessage, setCodeMessage] = useState<string>(CODE_MESSAGE);
  const changeForm = React.createRef<FormInstance>();
  const submitLogin = async (e: formType) => {
    const phone: string = e.phoneNumber; // 登录时候
    const password: string = e.password;
    const remember: boolean | undefined = e.remember;
    // 1. 检查手机号是否注册
    const esist: number = await CHECK_PHONE(phone);
    // 手机号已经注册
    if (esist == 1) {
      // 登录
      const result = await LOGIN(phone, password);
      if (result && result.code == 200) {
        const user = {
          nickname: result.profile.nickname,
          userId: result.profile.userId,
          avatarUrl: result.profile.avatarUrl,
          signature: result.profile.signature,
        };
        props.dispatch({
          type: 'user/setUser',
          user,
        });
        // 如果登陆成功，判断是否记住密码,也就是记住用户登陆状态
        if (remember) {
          // 记住密码
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(result.token));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('token', JSON.stringify(result.token));
        }
        message.success('登陆成功');
        history.replace('/me');
      } else {
        message.error('密码错误');
      }
    } else {
      // 手机号未注册
      message.warning('手机号暂未注册，清洗前往网易云注册');
    }
  };
  // 修改密码
  let registerPhone = ''; // 用户修改密码输入的手机号
  const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerPhone = e.target.value;
  };
  // 获取验证码
  const getPhoneCode = async () => {
    const reg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g;
    if (!reg.test(registerPhone)) {
      message.error('请输入手机号');
      return;
    }
    if (codeMessage != CODE_MESSAGE) {
      return;
    }
    let count: number = 60;
    let timer: NodeJS.Timer;
    timer = setInterval(() => {
      count--;
      setCodeMessage(`${count}s`);
      if (count == 0) {
        clearInterval(timer);
        setCodeMessage(CODE_MESSAGE);
      }
    }, 1000);
    const res = await CODE(registerPhone);
    if (res.code) {
      message.success('验证码已发送，请注意查收');
    }
  };
  // 点击修改密码
  const submitRegister = async (e: registerForm) => {
    // const
    const code = e.code;
    const password = e.password;
    const phoneNumber = e.phoneNumber;
    const res = await CHECK_CODE(phoneNumber, code);
    if (res.data) {
      const res = await CHANGE_PASSWORD(phoneNumber, password, code);
      message.success('修改密码成功--登录成功');
      changeForm.current!.resetFields();
      const user = {
        nickname: res.profile.nickname,
        userId: res.profile.userId,
        avatarUrl: res.profile.avatarUrl,
        signature: res.profile.signature,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      props.dispatch({
        type: 'user/setUser',
        user,
      });
    } else {
      message.success('验证码错误');
    }
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
                loading={codeMessage == CODE_MESSAGE ? false : true}
                onSearch={getPhoneCode}
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
