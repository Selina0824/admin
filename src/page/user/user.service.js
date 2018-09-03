import Util from '../../util/util';
import $ from 'jquery';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class UserService {

  /** 
   * 家长管理部分
   */
  //获取家长列表
  getParentsList(listParam) {
    let url = baseUrl + '/account/parents',
      data = {};
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
    } else if (listParam.listType === 'search') {
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
    }
    //选择下拉框中设置size为10000
    if (listParam.size) {
      data.size = listParam.size
    }
    return _util.request({
      type: 'get',
      url: url,
      data: data
    });
  }
  //添加家长
  addParents(userInfo) {
    let url = baseUrl + '/account/parents';
    return _util.request({
      type: 'post',
      url: url,
      data: userInfo
    })
  }

  //修改家长
  editParents(userInfo) {
    let url = `${baseUrl}/account/parents/${userInfo.id}`
    return _util.request({
      type: 'put',
      url: url,
      data: userInfo
    })
  }

  //删除家长
  deleteParents(id) {
    let url = baseUrl + '/account/parents/' + id;
    return _util.request({
      type: 'delete',
      url: url
    })
  }
  // 检查家长信息
  checkParentsInfo(parentsInfo) {
    let name = $.trim(parentsInfo.name);
    let childName = $.trim(parentsInfo.childName);
    let phone = parentsInfo.phone;
    let clazzId = parentsInfo.clazzId;
    // 检查家长名称
    if (typeof name !== 'string' || name.length === 0) {
      return {
        status: false,
        msg: '家长姓名不能为空'
      }
    };
    if (typeof childName !== 'string' || childName.length === 0) {
      return {
        status: false,
        msg: '孩子姓名不能为空'
      }
    };
    if (!this.isPhoneAvailable(phone)) {
      return {
        status: false,
        msg: '请输入正确的手机号码'
      }
    }
    //检查是否选择班级
    if (!clazzId) {
      return {
        status: false,
        msg: '请选择班级'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    };
  }
  isPhoneAvailable(phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  }


  /** 
   * 老师管理部分
   */
  //获取老师列表
  getTeacherList(listParam) {
    let url = baseUrl + '/account/teachers',
      data = {};
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
    } else if (listParam.listType === 'search') {
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
    }
    //选择下拉框中设置size为10000
    if (listParam.size) {
      data.size = listParam.size
    }
    return _util.request({
      type: 'get',
      url: url,
      data: data
    });
  }
  //添加老师
  addTeacher(userInfo) {
    let url = baseUrl + '/account/teachers';
    return _util.request({
      type: 'post',
      url: url,
      data: userInfo
    })
  }

  //修改老师
  editTeacher(userInfo) {
    let url = `${baseUrl}/account/teachers/${userInfo.id}`
    return _util.request({
      type: 'put',
      url: url,
      data: userInfo
    })
  }

  //删除老师
  deleteTeacher(id) {
    let url = baseUrl + '/account/teachers/' + id;
    return _util.request({
      type: 'delete',
      url: url
    })
  }
  // 检查老师信息
  checkTeacherInfo(teacherInfo) {
    let name = $.trim(teacherInfo.name);
    let phone = teacherInfo.phone;
    let clazzId = teacherInfo.clazzId;
    // 检查老师姓名
    if (typeof name !== 'string' || name.length === 0) {
      return {
        status: false,
        msg: '老师姓名不能为空'
      }
    };
    if (!this.isPhoneAvailable(phone)) {
      return {
        status: false,
        msg: '请输入正确的手机号码'
      }
    }
    //检查是否选择班级
    if (!clazzId) {
      return {
        status: false,
        msg: '请选择班级'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    };
  }

  /** 
   * 老师注册管理部分
   */
  // 获取老师注册列表
  getRegsisteriesList(listParam) {
    let url = baseUrl + '/account/registries',
      data = {};
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
    } else if (listParam.listType === 'search') {
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
    }
    return _util.request({
      type: 'get',
      url: url,
      data: data
    });
  }
  //审批
  setTeacherStatus(id,approved){
    let url = baseUrl + `/account/registries/${id}/approve`;
    return _util.request({
      type:'post',
      url:url,
      data:{
        id,approved
      }
    })
  }
}
export default UserService;