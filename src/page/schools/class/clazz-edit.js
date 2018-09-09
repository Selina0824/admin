import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import SchoolSelector from '../../../component/selector/school-selector';
import SchoolService from '../school.service';

const _schoolService = new SchoolService();
const _util = new Util();


class ClazzEdit extends Component{
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
  onSchoolChange(schoolId){
    this.setState({
        schoolId
    })
  }
  onInputChange(e){
    let inputValue = e.target.value;
    this.setState({
      name:inputValue
    });
  }
  onSubmit(e){
    let clazzInfo = {
      name: this.state.name,
      schoolId: this.state.schoolId
    };
    let checkResult = _schoolService.checkNewClazzInfo(clazzInfo);
    if(checkResult.status){
      if(this.state.id){
        clazzInfo = {
          id: this.state.id,
          ...clazzInfo
        }
        _schoolService.editClazz(clazzInfo).then(res=>{
          alert('编辑成功');
          this.props.history.push('/school/class-list');
        },err=>_util.errorTips(err))
      } else {
        _schoolService.addClazz(clazzInfo).then(res =>{
          alert('添加成功');
          this.props.history.push('/school/class-list');
        }, err => {
          _util.errorTips(err);
      })
      }
    }else{
        _util.errorTips(checkResult.msg);
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
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    value={this.state.name}
                    placeholder="请输入班级名称" 
                    onChange = {e=>this.onInputChange(e)}/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所属学校</label>
                <SchoolSelector schoolId={this.state.schoolId} 
                  onSchoolChange = {(schoolId)=>{this.onSchoolChange(schoolId)}}/>
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

export default ClazzEdit;

