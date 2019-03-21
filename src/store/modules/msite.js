/**
 * msite模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
} from '../mutation-types';
import {
  reqAddress,
  reqCategories,
  reqShops,
} from '../../api';

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categories: [], // 分类数组
  shops: [], // 商家数组
};
const mutations = {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address;
  },
  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories;
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops;
  },
};
const actions = {
  async getAddress ({commit, state}) {
    //发送异步请求
    const {longitude, latitude} = state;
    const result = await reqAddress(longitude, latitude);
    const address = result.data;
    //调用commit更新状态数据
    commit(RECEIVE_ADDRESS, {address});
  },
  async getCategories ({commit}) {
    //发送异步请求
    const result = await reqCategories();
    //调用commit更新状态数据
    const categories = result.data;
    commit(RECEIVE_CATEGORIES, {categories});
  },
  async getShops ({commit, state}) {
    //发送异步请求
    const {longitude, latitude} = state;
    const result = await reqShops({longitude, latitude});
    //调用commit更新状态数据
    const shops = result.data;
    commit(RECEIVE_SHOPS, {shops});
  },
};
const getters = {

};
export default {
  state,
  mutations,
  actions,
  getters
};
