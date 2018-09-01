import Util from '../../util/util';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class ServiceItemService {
  // 获取家长列表
  getServicesList(listParam) {
    let url = baseUrl + '/service/items',
      data = {};
      //一般请求
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
      //搜索框搜索请求
    } else if(listParam.listType === 'search'){
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
      //次级地区请求
    } else {
      data.size = listParam.size;
      if(listParam.id){
        data.superiorId = listParam.id;
      }
    }
    if(listParam.size){
      data.size = listParam.size
    }
    return _util.request({
      type: 'get',
      url: url,
      data: data
    });
  }
}
export default ServiceItemService;
