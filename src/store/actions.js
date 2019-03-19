/**
 * 包含多条间接更新状态数据的方法的对象模块
 */
import {
  reqAddress,
  reqCategories,
  reqShops
} from '../api';

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS
} from './mutation-types';
export default {
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
  }

}
