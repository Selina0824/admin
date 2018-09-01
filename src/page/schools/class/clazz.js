import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import {Link} from 'react-router-dom';
// import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import Util from '../../../util/util';
import SchoolService from '../school.service';
import Search from '../../../component/list-search/list-search'
import '../../../App.css';
import Pagination from 'rc-pagination';

const _schoolService = new SchoolService();
const _util = new Util();

class Clazz extends Component{
  constructor(props){
    super(props);
    this.state= {
      data:[],
      pageNum:1,
      firstLoading:true,
      listType:'list'
    }
  }

  componentDidMount(){
    this.loadClazzList();
  }
  //加载服务项目列表
  loadClazzList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _schoolService.getClazzList(listParam).then(res => {
      this.setState(res);
    }, err=> {
      this.setState({
        data:[]
      })
      _util.errorTips(err);
    })
  }
  onSearch(searchType, searchKeyword){
    let listType = searchKeyword === ''? 'list':'search';
    this.setState({
      listType:listType,
      pageNum:1,
      searchType,
      searchKeyword
    },()=>{
      this.loadClazzList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadClazzList();
    })
  }
  deleteClazz(id){
    if(window.confirm(`确定要删除班级 ${id} 吗？`)){
      _schoolService.deleteClazz(id).then(res=>{
        alert('删除成功。')
        this.loadClazzList();
      },err=>{
        _util.errorTips(err);
      })
    }
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'10%'},
      {name:'班级名称', width:'30%'},
      {name:'所属学校', width:'30%'},
      {name:'所属区域ID', width:'15%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '班级管理'>
          <div className='page-header-right'>
            <Link to='/school/class-add' className='btn btn-primary'>
              <i className='fa fa-plus'/>
              <span>添加班级</span>
            </Link>
          </div>
        </Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((clazz,index)=> {
              return (
                <tr key={index}>
                    <td>{clazz.id}</td>
                    <td>{clazz.name}</td>
                    <td>{clazz.school.name}</td>
                    <td>{clazz.school.regionId}</td>
                    <td>
                      <Link className='operator' to={`/school/class-detail/${clazz.id}`}>详情</Link>
                      <Link className='operator' to={`/school/class-edit/${clazz.id}`}> 编辑</Link>
                      <button className='btn btn-primary' onClick={(e)=>{this.deleteClazz(clazz.id)}}>删除</button>
                    </td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination current = {this.state.start+1} 
          total={this.state.total} 
          onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default Clazz;

