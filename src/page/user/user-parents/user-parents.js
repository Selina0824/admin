import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import {Link} from 'react-router-dom';
import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import Util from '../../../util/util';
import UserService from '../user.service';
import Search from '../../../component/list-search/list-search'
import '../../../App.css';

const _userService = new UserService();
const _util = new Util();

class UserParents extends Component{
  constructor(props){
    super(props);
    this.state= {
      data:[],
      pageNum:1,
      listType:'list'
    }
  }

  componentDidMount(){
    this.loadParentsList();
  }
  loadParentsList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _userService.getParentsList(listParam).then(res => {
      this.setState(res);
    }, err=> {
      this.setState({
        data:[]
      });
      _util.errorTips(err);
    })
  }
  onSearch(searchType,searchKeyword){
    let listType = searchKeyword === ''? 'list':'search';
    this.setState({
      listType:listType,
      pageNum:1,
      searchType,
      searchKeyword
    },()=>{
      this.loadParentsList();
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
  deleteUser(id){
    if(window.confirm(`确定要删除 ${id} 吗？`)){
      _userService.deleteParents(id).then(res=>{
        this.loadParentsList();
      },err=>{
        _util.errorTips(err)
      })
    }
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'5%'},
      {name:'家长姓名', width:'10%'},
      {name:'孩子姓名', width:'10%'},
      {name:'所在学校', width:'15%'},
      {name:'所在班级', width:'15%'},
      {name:'电话', width:'15%'},
      // {name:'注册时间', width:'15%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '家长管理'>
        <div className='page-header-right'>
            <Link to='/user/parents/add' className='btn btn-primary'>
              <i className='fa fa-plus'/>
              <span> 添加家长</span>
            </Link>
          </div>
        </Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((user,index)=> {
              return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.childName}</td>
                    <td>{user.clazz?user.clazz.school.name:'—'}</td>
                    <td>{user.clazz?user.clazz.name:'—'}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Link className='operator' to={`/user/parents/detail/${user.id}`}>详情 </Link>
                      <Link className='operator' to={`/user/parents/edit/${user.id}`}> 编辑</Link>
                      <button className='btn btn-primary ' onClick={(e)=>{this.deleteUser(user.id)}}>删除</button>
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

export default UserParents;
