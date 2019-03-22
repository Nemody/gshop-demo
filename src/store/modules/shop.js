/**
 * shop模块
 */
import Vue from 'vue'
import {
  reqInfo,
  reqGoods,
  reqRatings
} from '../../api';
import {
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RETINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS
} from '../mutation-types';

const state = {
  goods: [], // 商品分类
  ratings: [], // 商家评价
  info: {}, // 商家信息
  cartFoods: [] // 保存被加入购物车的食品列表
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
  [INCREMENT_FOOD_COUNT] (state, food) {
    if (food.count) {
        // 若已有food.count
      food.count++;
    } else {
      // 若无则新建并赋值为1
      // food.count = 1;
      // vue中新添加的属性不是响应式的，要借助Vue的set方法给响应式对象上添加一个响应式属性
      Vue.set(food, 'count', 1);
      state.cartFoods.push(food);
    }
  },
  [DECREMENT_FOOD_COUNT] (state, food) {
    if (food.count > 0) {
      // 若已有food.count
      food.count--;
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1);
      }
    }
  },
  [CLEAR_CART_FOODS] (state) {
    state.cartFoods = [];
  }
};
const actions = {
  // 从后台获取商家信息的异步action
  async getInfo ({commit}) {
    const result = await reqInfo();
    if(result.code === 0){
        // 商家信息获取成功
      commit(RECEIVE_INFO, result.data);
    }
  },
  // 从后台获取分类列表的异步action
  async getGoods({commit}, callback) {
    const result = await reqGoods();
    if(result.code === 0){
      // 商品分类获取成功
      commit(RECEIVE_GOODS, result.data);
      typeof callback === 'function' && callback();
    }
  },
  // 从后台获取商家评价的异步action
  async getRatings ({commit}) {
    const result = await reqRatings();
    if(result.code === 0){
      // 商家评价获取成功
      commit(RECEIVE_RETINGS, result.data);
    }
  },
  // 更新食物数量的同步action
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
        // 食物数量加1
      commit(INCREMENT_FOOD_COUNT, food);
    } else {
      // 食物数量减1
      commit(DECREMENT_FOOD_COUNT, food);
    }
  },
  // 清空购物车中的食品列表的同步action
  clearCartFoods ({commit}) {
    commit(CLEAR_CART_FOODS);
  }
};
const getters = {
  totalCount () {
    const {cartFoods} =state;
    return cartFoods.reduce((pre, food) => pre + food.count , 0);
  },
  totalPrice () {
    const {cartFoods} =state;
    return cartFoods.reduce((pre, food) => pre + food.count * food.price , 0);
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
