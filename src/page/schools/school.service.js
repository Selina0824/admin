import Util from '../../util/util';
import $ from 'jquery';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'

class SchoolService {
  // 获取学校列表
  getSchoolList(listParam) {
    let url = baseUrl + '/account/schools',
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

  //添加学校
  addSchool(schoolInfo) {
    let url = baseUrl + '/account/schools';
    return _util.request({
      type:'post',
      url:url,
      data: schoolInfo
    })
  }

  //修改学校
  editSchool(schoolInfo){
    let url = `${baseUrl}/account/schools/${schoolInfo.id}`
    return _util.request({
      type:'put',
      url:url,
      data: {
        name: schoolInfo.name,
        regionId: schoolInfo.regionId
      }
    })
  }

  //删除学校
  deleteSchool(id){
    let url = baseUrl+'/account/schools/'+id;
    return _util.request({
      type:'delete',
      url:url
    })
  }

  getClazzList(data) {
    return _util.request({
      type: 'get',
      url: '/account/clazzs',
      data: {
        pageNum: data
      }
    });
  }

  checkNewSchoolInfo(schoolInfo) {
    let name = $.trim(schoolInfo.name);
    let regionId = schoolInfo.regionId;
    // 检查学校名称
    if (typeof name !== 'string' || name.length === 0) {
      return {
        status: false,
        msg: '学校名称不能为空'
      }
    };
    //检查是否选择区域
    if(!regionId){
      return {
        status: false,
        msg: '请选择区域'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    };
  }
}
export default SchoolService;