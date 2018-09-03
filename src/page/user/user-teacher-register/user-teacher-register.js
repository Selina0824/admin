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

class UserTeacherRegister extends Component{
  constructor(props){
    super(props);
    this.state= {
        tabs:[{
            active:true,
            title:'首页',
            href:'/'
        },
        {
            active:true,
            title:'首页',
            href:'/'
        },
        {
            active:true,
            title:'首页',
            href:'/'
        }
      ],
      STATUS:['等待审批','审批通过','审批拒绝'],
      data:[],
      pageNum:1,
      listType:'list',
      statusColor:['status-grey','status-green','status-red']
    }
  }

  componentDidMount(){
    this.loadRegistry();
  }
  loadRegistry(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    _userService.getRegsisteriesList(listParam).then(res => {
      this.setState(res);
    }, err=> {
      this.setState({
        data:[]
      })
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
      this.loadRegistry()
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadRegistry(pageNum);
    })
  }
  setTeacherStatus(id,approved){
    if(!approved){
        if(window.confirm(`确定要拒绝老师注册申请 ${id} 吗?`)){
            _userService.setTeacherStatus(id,approved).then(res=>{
                alert('审批成功');
                this.loadRegistry();
              },err=>{
                _util.errorTips(err);
            })
        }
    } else {
        _userService.setTeacherStatus(id,approved).then(res=>{
            alert('审批成功');
            this.loadRegistry();
          },err=>{
            _util.errorTips(err);
        })
    }
    
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'10%'},
      {name:'老师姓名', width:'10%'},
      {name:'所在学校', width:'15%'},
      {name:'所在班级', width:'15%'},
      {name:'电话', width:'15%'},
      {name:'状态', width:'10%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '老师注册管理' tabs = {this.state.tabs}></Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((user,index)=> {
              return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.clazz.school.name}</td>
                    <td>{user.clazz.name}</td>
                    <td>{user.phone}</td>
                    <td className={this.state.statusColor[user.status]}>{this.state.STATUS[user.status]}</td>
                    <td>
                      <span>
                        <Link className='operator' to={`/user/teacher-register/detail/${user.id}`}>查看详情 </Link>
                      </span>
                      {/* <Link className='operator' to={`/user/parents/edit/${user.id}`}> 编辑</Link> */}
                      {
                        !user.status?(
                          <div className='float-left'>
                            <button className='btn btn-warning btn-xs operator-xs' onClick={(e)=>{this.setTeacherStatus(user.id,false)}}>拒绝</button>
                            <button className='btn btn-primary btn-xs operator-xs' onClick={(e)=>{this.setTeacherStatus(user.id,true)}}>通过</button>
                          </div>
                        ):null
                      }
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

export default UserTeacherRegister;

