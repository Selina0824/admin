import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../component/page-title/title';
import Util from '../../util/util';
import ServiceItemService from './service-item.service';

const _serviceItemService  = new ServiceItemService();
const _util = new Util();


class ServiceEdit extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '服务管理 -- 添加服务'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
            <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">名称</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" name="name" id="name" placeholder="请输入服务名称" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="col-md-2 control-label">描述</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" name="subtitle" id="subtitle" placeholder="请输入服务描述" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">所属服务</label>
                <div className="col-md-3">
                  <select type="password" className="form-control cate-select col-md-5">
                    <option value="">请选择服务类别</option>
                    <option value="">亲子到家</option>
                    <option value="100001">亲子接送</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label for="price" className="col-md-2 control-label">单价</label>
                <div className="col-md-3">
                  <div className="input-group">
                    <input type="number" className="form-control" id="price" placeholder="单价" name="price" value=""/>
                    <div className="input-group-addon">元</div>
                  </div>
                </div>
              </div>
              <div className="form-group"><label for="stock" className="col-md-2 control-label">数量</label>
                <div className="col-md-3">
                  <div className="input-group"><input type="number" className="form-control" id="stock" name="stock" placeholder="数量" value=""/>
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

