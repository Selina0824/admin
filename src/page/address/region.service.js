import Util from '../../util/util';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class RegionService {
  // 获取地区列表
  getRegionList(listParam) {
    let url = baseUrl + '/region/regions',
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



  getAddressList(listParam) {
    let url = baseUrl + '/service/addresses',
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
export default RegionService;