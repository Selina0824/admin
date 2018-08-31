import Util from '../../util/util';
const _util = new Util();
class ServiceItemService{
    // 获取服务项目列表
    getServicesList(listParam){
      let url = '',
          data = {};
      if(listParam.listType === 'list'){
        url = '/manage/product/list.do';
        data.pageNum = listParam.pageNum;
      } else {
        url = '/manage/product/search.do';
        data.pageNum = listParam.pageNum;
        data[listParam.searchType]=listParam.searchKeyword;
      }
        return _util.request({
          type: 'post',
          url: url,
          data:data
        });
    }
}
export default ServiceItemService;
