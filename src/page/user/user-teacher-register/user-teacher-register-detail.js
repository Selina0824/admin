import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import ClassSelector from '../../../component/selector/clazz-selector';
import UserService from '../user.service';

const _userService = new UserService();
const _util = new Util();


class TeacherRegisterDetail extends Component{
  constructor(props){
    super(props);
    this.state ={
      id: this.props.match.params.id,
      name:'',
      idNum:'',
      phone:'',
      regionId : 0,
      schoolId : 0,
      clazzId : 0
    }
  }
  componentDidMount(){
    this.loadTeacher();
  }
  // 加载老师注册详情
  loadTeacher(){
    // 如果有id，表示是编辑功能，需要回填班级信息
    if(this.state.id){
      let listParam = {
        pageNum: 1,
        listType:'search',
        searchType: 'id',
        searchKeyword:this.state.id
      }
      _userService.getRegsisteriesList(listParam).then(res=>{
        this.setState(
          {
            schoolId : res.data[0].clazz.school.id,
            clazzId: res.data[0].clazz.id,
            name: res.data[0].name,
            phone: res.data[0].phone,
            idNum:res.data[0].idNum,
            avatar:res.data[0].avatar
          }
        );
      }, err=>{
        _util.errorTips(err)
      })
    }
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '老师注册管理 -- 老师注册详情'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">老师姓名</label>
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    name="name"
                    readOnly 
                    value={this.state.name}/>
                </div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="idNum" className="col-md-2 control-label">身份证号码</label>
                <div className="col-md-3">
                  <input type="text" 
                  className="form-control" 
                  name="idNum"
                  readOnly 
                  value={this.state.idNum}/>
                </div>
              </div> */}
              <div className="form-group">
                <label htmlFor="phone" className="col-md-2 control-label">手机号码</label>
                <div className="col-md-3">
                  <input type="text" 
                    className="form-control" 
                    name="phone"
                    readOnly
                    value={this.state.phone}/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-md-2 control-label">所在班级</label>
                <ClassSelector clazzId = {this.state.clazzId} 
                  schoolId = {this.state.schoolId} readOnly='2'/>
              </div>
              {
                  this.state.avatar?(
                    <div className="form-group">
                    <label  className="col-md-2 control-label">老师头像</label>
                    <div className='col-md-3'>
                          <img className='avatar' alt='老师头像' src={this.state.avatar}/>
                    </div>
                  </div>
                  ):null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TeacherRegisterDetail;

