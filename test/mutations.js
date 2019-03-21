/**
 * 包含多个直接更新状态数据的方法的对象模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO
} from '../src/store/mutation-types';

export default {
    [RECEIVE_ADDRESS] (state, {address}) {
      state.address = address;
    },
    [RECEIVE_CATEGORIES] (state, {categories}) {
      state.categories = categories;
    },
    [RECEIVE_SHOPS] (state, {shops}) {
      state.shops = shops;
    },
  [RECEIVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo;
  },
  [RESET_USERINFO] (state) {
    state.userInfo = {};
  }
}
