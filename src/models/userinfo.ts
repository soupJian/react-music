import { ImmerReducer } from 'umi';
import { userType } from '../tsType/index';

export interface IndexModelState {
  token: string;
  user_detail: userType;
}
export interface IndexModelType {
  namespace: 'user';
  state: IndexModelState;
  reducers: {
    setToken: ImmerReducer<IndexModelState>;
    setUser: ImmerReducer<IndexModelState>;
  };
}
const user_detail: userType = {
  nickname: '',
  userId: 0,
  avatarUrl: '',
  backgroundUrl: '',
  signature: '',
};
const IndexModel: IndexModelType = {
  namespace: 'user',
  state: {
    token:
      sessionStorage.getItem('token') || localStorage.getItem('token') || '',
    user_detail: JSON.parse(
      sessionStorage.getItem('user') ||
        localStorage.getItem('user') ||
        JSON.stringify(user_detail),
    ),
  },
  reducers: {
    // 启用 immer 之后
    setToken(state, action) {
      return { ...state, token: action.payload };
    },
    setUser(state, action) {
      return { ...state, user_detail: action.user };
    },
  },
};

export default IndexModel;
