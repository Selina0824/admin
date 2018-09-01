import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import RegionSelector from '../../../component/selector/region-selector';
import SchoolSelector from '../../../component/selector/school-selector';
import SchoolService from '../school.service';
import RegionService from '../../address/region.service';

const _schoolService = new SchoolService();
const _regionService  = new RegionService();
const _util = new Util();


class ClazzDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      id: this.props.match.params.id,
      schoolId:0,
      name:''
    }
  }
  componentDidMount(){
    this.loadClazz();
  }
  // 加载班级详情
  loadClazz(){
    // 如果有id，表示是编辑功能，需要回填班级信息
    if(this.state.id){
      let listParam = {
        pageNum: 1,
        listType:'search',
        searchType: 'id',
        searchKeyword:this.state.id
      }
      _schoolService.getClazzList(listParam).then(res=>{
        this.setState({
          name:res.data[0].name,
          schoolId: res.data[0].school.id
        });
      }, err=>{
        _util.errorTips(err)
      })
    }
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = {this.state.id?'班级管理 -- 编辑班级':'班级管理 -- 添加班级'}/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="parentName" className="col-md-2 control-label">班级名称</label>
                <div className="col-md-5">
                  <input type="text" 
                    className="form-control" 
                    readOnly
                    value={this.state.name} />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所属学校</label>
                <SchoolSelector schoolId={this.state.schoolId} readOnly = '2' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClazzDetail;

