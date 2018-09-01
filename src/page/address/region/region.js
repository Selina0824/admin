import React, {Component} from 'react';
import Title from '../../../component/page-title/title';
import {Link} from 'react-router-dom';
import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import Util from '../../../util/util';
import RegionService from '../region.service';
import Search from '../../../component/list-search/list-search'
import '../../../App.css';

const _regionService = new RegionService();
const _util = new Util();

class Region extends Component{
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
    this.loadRegionList();
  }
  //加载服务项目列表
  loadRegionList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _regionService.getRegionList(listParam).then(res => {
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
      this.loadRegionList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadRegionList();
    })
  }
  deleteRegion(id){
    if(window.confirm(`确定要删除 ${id} 吗？`)){
      console.log('delete region '+ id)
    }
  }
  render(){
    let tableHeads = [
      {name:'ID', width:'5%'},
      {name:'简称', width:'10%'},
      {name:'全称', width:'20%'},
      {name:'编码', width:'10%'},
      {name:'级别', width:'5%'},
      {name:'经度', width:'15%'},
      {name:'纬度', width:'10%'},
      {name:'上级ID', width:'5%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '地区管理'>
          <div className='page-header-right'>
            <Link to='/region/region-add' className='btn btn-primary'>
              <i className='fa fa-plus'/>
              <span>添加地区</span>
            </Link>
          </div>
        </Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((region,index)=> {
              return (
                <tr key={index}>
                    <td>{region.id}</td>
                    <td>{region.name}</td>
                    <td>{region.fullName}</td>
                    <td>{region.code}</td>
                    <td>{region.level}</td>
                    <td>{region.latitude}</td>
                    <td>{region.longitude}</td>
                    <td>{region.superiorId}</td>
                    <td>
                      <Link className='operator' to={`user/parents/detail/${region.id}`}>详情</Link>
                      <Link className='operator' to={`user/parents/edit/${region.id}`}> 编辑</Link>
                      <button className='btn btn-primary' onClick={(e)=>{this.deleteRegion(region.id)}}>删除</button>
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

export default Region;