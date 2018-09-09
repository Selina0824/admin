import React, {Component} from 'react';
import Title from '../../component/page-title/title';
class ServiceEdit extends Component{
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '服务管理 -- 添加服务'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">服务类型</label>
                <div className="col-md-3">
                  <select type="password" className="form-control cate-select col-md-5">
                    <option value="">请选择服务类别</option>
                    <option value="">亲子到家</option>
                    <option value="100001">亲子接送</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">开始时间</label>
                <div className="col-md-3">
                  
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">结束时间</label>
                <div className="col-md-3">
                  
                </div>
              </div>
              <div className="form-group"><label for="price" className="col-md-2 control-label">单价</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number" className="form-control" id="price" placeholder="单价" name="price"/>
                    <div className="input-group-addon">元</div>
                  </div>
                </div>
              </div>
              <div className="form-group"><label for="stock" className="col-md-2 control-label">数量</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number" className="form-control" id="stock" name="stock" placeholder="数量" value="1"/>
                    <div className="input-group-addon">小时</div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="btn" className="btn btn-xl btn-primary">提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceEdit;

