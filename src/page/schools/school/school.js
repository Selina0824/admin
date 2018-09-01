import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import {Link} from 'react-router-dom';
import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import Util from '../../../util/util';
import SchoolService from '../school.service';
import Search from '../../../component/list-search/list-search'
import '../../../App.css';

const _schoolService = new SchoolService();
const _util = new Util();

class School extends Component{
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
    this.loadSchoolList();
  }
  //加载学校列表
  loadSchoolList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _schoolService.getSchoolList(listParam).then(res => {
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
      this.loadSchoolList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadSchoolList();
    })
  }
  deleteSchool(id){
    if(window.confirm(`确定要删除学校 ${id} 吗？`)){
      _schoolService.deleteSchool(id).then(res=>{
        alert('删除成功。')
        this.loadSchoolList();
      },err=>{
        _util.errorTips(err);
      })
    }
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'20%'},
      {name:'学校名称', width:'45%'},
      {name:'所属区域ID', width:'20%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '学校管理'>
          <div className='page-header-right'>
            <Link to='/school/school-add' className='btn btn-primary'>
              <i className='fa fa-plus'/>
              <span>添加学校</span>
            </Link>
          </div>
        </Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((school,index)=> {
              return (
                <tr key={index}>
                    <td>{school.id}</td>
                    <td>{school.name}</td>
                    <td>{school.regionId}</td>
                    <td>
                      <Link className='operator' to={`/school/school-detail/${school.id}`}>详情</Link>
                      <Link className='operator' to={`/school/school-edit/${school.id}`}> 编辑</Link>
                      <button className='btn btn-primary' onClick={(e)=>{this.deleteSchool(school.id)}}>删除</button>
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

export default School;
