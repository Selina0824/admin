import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import {Link} from 'react-router-dom';
import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import Util from '../../../util/util';
import UserService from '../user.service';
import '../../../App.css';

const _userService = new UserService();
const _util = new Util();


class UserTeacher extends Component{
  constructor(props){
    super(props);
    this.state= {
      list:[],
      pageNum:1
    }
  }

  componentDidMount(){
    this.loadTeacherList(this.state.pageNum);
  }
  loadTeacherList(pageNum){
    _userService.getTeacherList(pageNum).then(res => {
      this.setState(res);
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
      this.loadTeacherList(pageNum);
    })
  }
  deleteUser(id){
    if(window.confirm(`确定要删除 ${id} 吗？`)){
      console.log('delete user '+ id)
    }
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'5%'},
      {name:'老师姓名', width:'10%'},
      {name:'所在学校', width:'15%'},
      {name:'所在班级', width:'15%'},
      {name:'电话', width:'15%'},
      {name:'注册时间', width:'20%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '老师管理'></Title>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.list.map((user,index)=> {
              return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.username}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                    <td>
                      <Link className='operator' to={`user/parents/detail/${user.id}`}>详情 </Link>
                      <Link className='operator' to={`user/parents/edit/${user.id}`}> 编辑</Link>
                      <button className='btn btn-primary ' onClick={(e)=>this.deleteUser(user.id)}>删除</button>
                    </td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination current = {this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default UserTeacher;

