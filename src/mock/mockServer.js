/**
 * mock模拟数据接口
 */

import Mock from 'mockjs';
import shop from './shop.json';

// 返回goods数据接口
Mock.mock('/goods',{code: 0, data: shop.goods});
//返回goods数据接口
Mock.mock('/ratings',{code: 0, data: shop.ratings});
//返回goods数据接口
Mock.mock('/info',{code: 0, data: shop.info});
