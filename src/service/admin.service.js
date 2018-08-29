import Util from "../util/util";
import $ from 'jquery';

const _util = new Util();

class User{
  // 用户登录
  login(loginInfo){
      return _util.request({
          type: 'post',
          url: '/manage/user/login.do',
          data: loginInfo
      });
  }
  // 用户退出登录
  logout(){
      return _util.request({
          type: 'post',
          url: '/user/logout.do'
      });
  }
  // 获取用户分页数据
  getUserList(pageNum){
      return _util.request({
          type: 'post',
          url: '/manage/user/list.do',
          data: {
              pageNum : pageNum
          }
      });
  }
  // 检查登录数据是否合法
  checkLoginInfo(loginInfo){
      let username = $.trim(loginInfo.username);
      let password = $.trim(loginInfo.password);
      // 检查用户名
      if(typeof username !== 'string' || username.length === 0){
          return{
              status: false,
              msg: '用户名不能为空'
          }
      };
      // 检查密码
      if(typeof password !== 'string' || password.length === 0){
          return{
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
