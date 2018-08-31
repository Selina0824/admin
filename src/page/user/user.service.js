import Util from '../../util/util';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class UserService{
    // 获取家长列表
    getParentsList(pageNum){
        return _util.request({
          type: 'get',
          url: baseUrl+'/account/users',
          data:{
            start: pageNum-1
          }
        });
    }

    getTeacherList(data){
      return _util.request({
        type: 'post',
        url: '/manage/user/list.do',
        data:{
          pageNum:data
        }
      });
  }
}
export default UserService;
