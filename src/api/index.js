/**
 * 包含多个请求函数的对象模块
 */
import ajax from './ajax';
const BASE = '/api';

//1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`);
//2、获取食品分类列表
export const reqCategories = () => ajax(BASE + '/index_category');
//3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(BASE + '/shops', {latitude, longitude});
