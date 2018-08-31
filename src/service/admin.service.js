import Util from "../util/util";
import $ from 'jquery';

const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class User {
  // 用户登录
  login(loginInfo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: baseUrl + '/account/oauth/token',
        dataType: 'json',
        data: loginInfo,
        headers: {
          'Authorization': 'Basic YnJvd3Nlcjo=',
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          // 数据请求成功
          typeof resolve === 'function' && resolve(res);
        },
        error: err => {
          if (401 === err.status) {
            typeof reject === 'function' && reject(err.message);
          }
          // 错误
          else {
            alert('请求失败！')
          }
        }
      });
    });
  }
  // 用户退出登录
  logout() {
    return _util.request({
      type: 'post',
      url: '/user/logout.do'
    });
  }
  // 检查登录数据是否合法
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username);
    let password = $.trim(loginInfo.password);
    // 检查用户名
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空'
      }
    };
    // 检查密码
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空'
      }
    };
    return {
      status: true,
      msg: '验证通过'
    };
  }
}

export default User;