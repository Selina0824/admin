import Util from '../util/util';
const _util = new Util();
class UserService{
    // 首页数据统计
    getParentsList(data){
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
