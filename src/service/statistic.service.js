import Util from '../util/util';
const _util = new Util();
class Statistic{
    // 首页数据统计
    getHomeCount(){
        return _util.request({
            url: '/manage/statistic/base_count.do',
        });
    }
}
export default Statistic;
