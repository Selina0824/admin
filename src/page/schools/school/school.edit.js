import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import RegionSelector from '../../../component/selector/region-selector'
import SchoolService from '../school.service';

const _schoolService = new SchoolService();
const _util = new Util();


class SchoolEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      regionId:0
    }
  }
  onRegionChange(regionId){
    this.setState({
        regionId: regionId
    },()=>{
      console.log(this.state.regionId);
    })
  }
  onInputChange(e){
    let inputValue = e.target.value;
    this.setState({
      name:inputValue
    });
  }
  onSubmit(e){
    let schoolInfo = {
      name: this.state.name,
      regionId: this.state.regionId
    };
    let checkResult = _schoolService.checkNewSchoolInfo(schoolInfo);
    if(checkResult.status){
        // _admin.login(loginInfo).then((res) => {
        //     _util.setStorage('userInfo', res);
        //     // 登陆成功，跳转页面
        //     this.props.history.push(this.state.redirect);
        // }, 
        _schoolService.addSchool(schoolInfo).then(res =>{
          alert('添加成功')
        }, err => {
          _util.errorTips(err);
      })
    }else{
        _util.errorTips(checkResult.msg);
    }
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '学校管理 -- 添加学校'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="parentName" className="col-md-2 control-label">学校名称</label>
                <div className="col-md-5">
                  <input type="text" 
                    className="form-control" 
                    placeholder="请输入学校名称" 
                    onChange = {e=>this.onInputChange(e)}/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所属地区</label>
                <RegionSelector onRegionChange = {(regionId)=>{this.onRegionChange(regionId)}}/>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="btn" 
                    className="btn btn-xl btn-primary"
                    onClick={e=>{this.onSubmit(e)}}>提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SchoolEdit;

