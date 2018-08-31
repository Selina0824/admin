import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
// import ServiceItemService from '../../../service/service-item.service';

// const _serviceItemService  = new ServiceItemService();
// const _util = new Util();


class ParentsEdit extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '家长管理 -- 添加家长'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="parentName" className="col-md-2 control-label">家长姓名</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" name="parentName" id="parentName" placeholder="请输入家长姓名" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="childName" className="col-md-2 control-label">孩子姓名</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" name="childName" id="childName" placeholder="请输入孩子姓名" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="col-md-2 control-label">手机号码</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" name="phone" id="phone" placeholder="请输入手机号码" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所在学校</label>
                <div className="col-md-3">
                  <select className="form-control cate-select col-md-5">
                    <option value="">请选择学校</option>
                    <option value="">漆凉铭幼儿园</option>
                    <option value="100001">金太阳幼儿园</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所在班级</label>
                <div className="col-md-3">
                  <select className="form-control cate-select col-md-5">
                    <option value="">请选择班级</option>
                    <option value="">学前2班</option>
                    <option value="100001">学前1班</option>
                  </select>
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

export default ParentsEdit;

