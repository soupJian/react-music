import { ImmerReducer } from 'umi';
import { userType } from '@/services/me/type';

export interface IndexModelState {
  user_detail: userType | null;
  loveIds: number[];
}
export interface IndexModelType {
  namespace: 'user';
  state: IndexModelState;
  reducers: {
    setToken: ImmerReducer<IndexModelState>;
    setUser: ImmerReducer<IndexModelState>;
    setUserLoveIds: ImmerReducer<IndexModelState>;
    loginout: ImmerReducer<IndexModelState>;
  };
}
const defaultUser: string | null =
  sessionStorage.getItem('user') || localStorage.getItem('user') || null;

const IndexModel: IndexModelType = {
  namespace: 'user',
  state: {
    user_detail: defaultUser ? JSON.parse(defaultUser) : null,
    loveIds: [],
  },
  reducers: {
    // 启用 immer 之后
    setToken(state, action) {
      return { ...state, token: action.payload };
    },
    setUser(state, action) {
      return { ...state, user_detail: action.user };
    },
    setUserLoveIds(state, action) {
      return { ...state, loveIds: action.loveIds };
    },
    loginout(state) {
      return {
        ...state,
        user_detail: null,
        loveIds: [],
      };
    },
  },
};

export default IndexModel;
