import Util from '../../../util/util';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'

class ComplaintService {
  // 获取投诉列表
  getComplaintList(listParam) {
    let url = baseUrl + '/service/complaints',
      data = {};
      //一般请求
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
      //搜索框搜索请求
    } else if(listParam.listType === 'search'){
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
    } 
    return _util.request({
      type: 'get',
      url: url,
      data: data
    });
  }
}
export default ComplaintService;
