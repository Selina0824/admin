import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import RegionSelector from '../../../component/selector/region-selector'
import SchoolService from '../school.service';
import RegionService from '../../address/region.service';

const _schoolService = new SchoolService();
const _regionService  = new RegionService();
const _util = new Util();


class SchoolDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      id: this.props.match.params.id,
      regionId:0,
      firstRegionId:1,
      secondRegionId:2,
      name:''
    }
  }
  componentDidMount(){
    this.loadSchool();
  }
  // 加载学校详情
  loadSchool(){
    // 如果有id，表示是编辑功能，需要回填学校信息
    if(this.state.id){
      let listParam = {
        pageNum: 1,
        listType:'search',
        searchType: 'id',
        searchKeyword:this.state.id
      }
      _schoolService.getSchoolList(listParam).then(res=>{
        // 根据学校的regionId去取其region的详细信息
        let schoolRegionId = res.data[0].regionId;
        let schoolRegionSuperiorId;
        this.setState({
          name:res.data[0].name,
          regionId: schoolRegionId
        });
        let regionListParam;
        regionListParam = {
          pageNum : 1,
          listType:'search',
          searchType:'id',
          searchKeyword: schoolRegionId
        };
        _regionService.getRegionList(regionListParam).then(res=>{
          // 获取到当前region的上一级id，并根据这个id去获取这个id下region的详细信息
          schoolRegionSuperiorId = res.data[0].superiorId
          regionListParam  = {
            pageNum : 1,
            listType:'search',
            searchType:'id',
            searchKeyword: schoolRegionSuperiorId
          };
          _regionService.getRegionList(regionListParam).then(region=>{
            if(region.data[0].superiorId){
              this.setState({
                firstRegionId:region.data[0].superiorId,
                secondRegionId:schoolRegionSuperiorId,
                thirdRegionId: schoolRegionId
              })
            } else {
              this.setState({
                firstRegionId:schoolRegionSuperiorId,
                secondRegionId:schoolRegionId
              })
            }
          })
        }, err=>{
          _util.errorTips(err)
        })

      }, err=>{
        _util.errorTips(err)
      })
    }
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '学校管理 -- 学校详情'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="parentName" className="col-md-2 control-label">学校名称</label>
                <div className="col-md-4">
                  <input type="text" 
                    className="form-control" 
                    value={this.state.name}
                    readOnly/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所属地区</label>
                <RegionSelector readOnly = '2'
                firstRegionId={this.state.firstRegionId} 
                secondRegionId = {this.state.secondRegionId} 
                thirdRegionId = {this.state.thirdRegionId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SchoolDetail;

