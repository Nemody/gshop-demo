/**
 * shop模块
 */
import {reqInfo} from '../../api';
import {RECEIVE_INFO} from '../mutation-types';
const state = {
  goods: [], // 商品分类
  ratings: [], // 商家评价
  info: {} // 商家信息
};
const mutations = {
  [RECEIVE_INFO] (state, info) {
    state.info = info;
  }
};
const actions = {
  async getInfo ({commit}) {
    const result = await reqInfo();
    if(result.code === 0){
        // 商家信息获取成功
      commit(RECEIVE_INFO, result.data);
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
