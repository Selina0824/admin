import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
// import {Link} from 'react-router-dom';
import Pagination from '../../../util/pagnination/pagnination';
import Util from '../../../util/util';
import UserService from '../../../service/user.service';

const _userService = new UserService();
const _util = new Util();


class UserParents extends Component{
  constructor(props){
    super(props);
    this.state= {
      list:[],
      pageNum:1,
      firstLoading:true
    }
  }

  componentDidMount(){
    this.loadParentsList(this.state.pageNum);
  }
  loadParentsList(pageNum){
    _userService.getParentsList(pageNum).then(res => {
      this.setState(res);()=>{
        this.setState({
          firstLoading:false
        })
      }
    }, err=> {
      this.setState({
        list:[]
      })
      _util.errorTips(err);
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadParentsList(pageNum);
    })
  }
  render(){
    let listBody = this.state.list.map((user,index)=> {
      return (
        <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.username}</td>
            <td>{user.username}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createTime).toLocaleString()}</td>
            <td></td>
        </tr>
      )
    });
    let listError = (
      <tr >
        <td colspan='8' style={{textAlign:'center'}}>{this.state.firstLoading?'正在加载数据 。。。':'没有找到相应的结果~'}</td>
      </tr>
    )
    let tableBody = this.state.list.length>0?listBody:listError;
    return (
      <div id='page-wrapper'>
        <Title title = '家长管理'></Title>
        <div className="row">
          <div className="table-wrap col-md-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>家长姓名</th>
                  <th>孩子姓名</th>
                  <th>所在学校</th>
                  <th>所在班级</th>
                  <th>电话</th>
                  <th>注册时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
        <Pagination current = {this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default UserParents;
