import { IndexModelState } from 'umi';
// 定义用户信息
export interface userType {
  nickname: string;
  userId: number;
  avatarUrl: string;
  backgroundUrl: string;
  signature: string;
}
// props
export interface propsType {
  children: React.ReactNode;
  user: IndexModelState;
  dispatch: any;
  location: {
    pathname: string;
  };
  history: any;
}
