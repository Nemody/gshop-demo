/**
 * 包含多个请求函数的对象模块
 */
import ajax from './ajax';
const BASE = '';

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`);
// 2、获取食品分类列表
export const reqCategories = () => ajax(BASE + '/index_category');
// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(BASE + '/shops', {latitude, longitude});
// 4、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone});
// 5、手机号验证码登陆
export const reqSmsLogin = ({phone, code}) => ajax(BASE + '/login_sms', {phone, code}, 'POST');
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST');
// 7、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE+ '/userinfo');
// 8、用户登出
export const reqLogout = () => ajax(BASE+ '/logout');
// 9、获取商品分类信息
export const reqGoods = () => ajax('/goods');
// 10、获取商家评论信息
export const reqRatings = () => ajax('/ratings');
// 11、获取商家详情信息
export const reqInfo = () => ajax('/info');
