import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import ClassSelector from '../../../component/selector/clazz-selector';
import UserService from '../user.service';
import FileUploader from '../../../component/file-uploader/file-uploader';

const _userService = new UserService();
const _util = new Util();


class ParentsEdit extends Component{
  constructor(props){
    super(props);
    this.state ={
      id: this.props.match.params.id,
      name:'',
      childName:'',
      idNum:'',
      phone:'',
      regionId : 0,
      schoolId : 0,
      clazzId : 0
    }
  }
  componentDidMount(){
    this.loadParents();
  }
  // 加载班级详情
  loadParents(){
    // 如果有id，表示是编辑功能，需要回填班级信息
    if(this.state.id){
      let listParam = {
        pageNum: 1,
        listType:'search',
        searchType: 'id',
        searchKeyword:this.state.id
      }
      _userService.getParentsList(listParam).then(res=>{
        this.setState(
          {
            schoolId : res.data[0].clazz.school.id,
            clazzId: res.data[0].clazz.id,
            name: res.data[0].name,
            childName: res.data[0].childName,
            phone: res.data[0].phone,
            idNum:res.data[0].idNum,
          }
        );
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
  onSubmit(e){
    let userInfo = {
      name: this.state.name,
      childName: this.state.childName,
      clazzId: this.state.clazzId,
      phone: this.state.phone,
      idNum: this.state.idNum
    };
    let checkResult = _userService.checkParentsInfo(userInfo);
    if(checkResult.status){
      if(this.state.id){
        userInfo = {
          id: this.state.id,
          ...userInfo
        }
        _userService.editParents(userInfo).then(res=>{
          alert('编辑成功');
          this.props.history.push('/user/parents');
        },err=>_util.errorTips(err))
      } else {
        _userService.addParents(userInfo).then(res =>{
          alert('添加成功');
          this.props.history.push('/user/parents');
        }, err => {
          _util.errorTips(err);
      })
      }
    }else{
        _util.errorTips(checkResult.msg);
    }
  }
  // 组件中学校或者班级发生变化时
  onPropsChange(schoolId,clazzId){
    this.setState({
        schoolId,
        clazzId
    })
  }
  onInputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]:inputValue
    });
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = {this.state.id?'家长管理 -- 编辑家长':'家长管理 -- 添加家长'}/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">家长姓名</label>
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    name="name" 
                    onChange = {e=>this.onInputChange(e)}
                    value={this.state.name}  
                    placeholder="请输入家长姓名"/>
                </div>
                <div className="col-md-1 required-input">*</div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="idNum" className="col-md-2 control-label">身份证号码</label>
                <div className="col-md-3">
                  <input type="text" 
                  className="form-control" 
                  name="idNum" 
                  value={this.state.idNum}
                  placeholder="请输入身份证号码"
                  onChange = {e=>this.onInputChange(e)} />
                </div>
              </div> */}
              <div className="form-group">
                <label htmlFor="childName" className="col-md-2 control-label">孩子姓名</label>
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    name="childName"
                    value={this.state.childName} 
                    placeholder="请输入孩子姓名"
                    onChange = {e=>this.onInputChange(e)} />
                </div>
                <div className="col-md-1 required-input">*</div>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="col-md-2 control-label">手机号码</label>
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    name="phone"
                    value={this.state.phone} 
                    placeholder="请输入手机号码"
                    onChange = {e=>this.onInputChange(e)} />
                </div>
                <div className="col-md-1 required-input">*</div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所在班级</label>
                <ClassSelector clazzId = {this.state.clazzId} 
                  schoolId = {this.state.schoolId}
                  onPropsChange = {(schoolId,clazzId)=>{this.onPropsChange(schoolId,clazzId)}}/>
              </div>
              <FileUploader/>
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

export default ParentsEdit;

