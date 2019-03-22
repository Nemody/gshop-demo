/**
 * shop模块
 */
import {
  reqInfo,
  reqGoods,
  reqRatings
} from '../../api';
import {
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RETINGS
} from '../mutation-types';

const state = {
  goods: [], // 商品分类
  ratings: [], // 商家评价
  info: {} // 商家信息
};
const mutations = {
  [RECEIVE_INFO] (state, info) {
    state.info = info;
  },
  [RECEIVE_GOODS] (state, goods) {
    state.goods = goods;
  },
  [RECEIVE_RETINGS] (state, ratings) {
    state.ratings = ratings;
  },
};
const actions = {
  async getInfo ({commit}) {
    const result = await reqInfo();
    if(result.code === 0){
        // 商家信息获取成功
      commit(RECEIVE_INFO, result.data);
    }
  },
  async getGoods({commit}, callback) {
    const result = await reqGoods();
    if(result.code === 0){
      // 商品分类获取成功
      commit(RECEIVE_GOODS, result.data);
      typeof callback === 'function' && callback();
    }
  },
  async getRatings ({commit}) {
    const result = await reqRatings();
    if(result.code === 0){
      // 商家评价获取成功
      commit(RECEIVE_RETINGS, result.data);
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
