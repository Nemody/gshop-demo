/**
 * user模块
 */
import {
  RECEIVE_USERINFO,
  RESET_USERINFO
} from '../mutation-types';
import {
  reqUserInfo,
  reqLogout
} from '../../api';

const state = {
  userInfo: {}, // 用户信息
};
const mutations = {
  [RECEIVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo;
  },
  [RESET_USERINFO] (state) {
    state.userInfo = {};
  }
};
const actions = {
  saveUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, userInfo);
  },
  async getUserInfo ({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      commit(RECEIVE_USERINFO, result.data);
    }
  },
  async logout ({commit}) {
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USERINFO);
    }
  }
};
const getters = {

};
export default {
  state,
  mutations,
  actions,
  getters
};
