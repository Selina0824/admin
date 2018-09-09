import Util from '../../../util/util';
const _util = new Util();
let baseUrl = 'https://api.st.qischool.cn'
class OrderService {
  // 获取订单列表
  getOrderList(listParam) {
    let url = baseUrl + '/service/st-orders',
      data = {};
      //一般请求
    if (listParam.listType === 'list') {
      data.start = listParam.pageNum - 1;
      //搜索框搜索请求
    } else if(listParam.listType === 'search'){
      data.start = listParam.pageNum - 1;
      data[listParam.searchType] = listParam.searchKeyword;
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
export default OrderService;
