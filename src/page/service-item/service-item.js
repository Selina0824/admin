import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import Title from '../../component/page-title/title';
import Pagination from '../../util/pagnination/pagnination';
import TableList from '../../component/table-list/table-list';
import Search from '../../component/list-search/list-search';
import Util from '../../util/util';
import ServiceItemService from './service-item.service';
import '../../App.css';

const _serviceItemService  = new ServiceItemService();
const _util = new Util();


class ServiceItem extends Component{
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
    this.loadServicesList();
  }
  //加载服务项目列表
  loadServicesList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _serviceItemService.getServicesList(listParam).then(res => {
      this.setState(res)
    }, err=> {
      this.setState({
        list:[]
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
      this.loadServicesList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadServicesList();
    })
  }
  deleteService(id){
    if(window.confirm(`确定要删除服务 ${id} 吗？`)){
      _serviceItemService.deleteService(id).then(res=>{
        // _util.successTips('删除成功！');
        this.loadServicesList();
      }
      , err => _util.errorTips());
    }
  }
  render(){
    let tableHeads = [
      {name:'编号', width:'5%'},
      {name:'服务名称', width:'10%'},
      {name:'开始时间', width:'15%'},
      {name:'结束时间', width:'15%'},
      {name:'单价', width:'10%'},
      {name:'数量', width:'10%'},
      {name:'总价', width:'10%'},
      {name:'老师ID', width:'10%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '服务项目管理'>
          {/* <div className='page-header-right'>
            <Link to='/services/add' className='btn btn-primary'>
              <i className='fa fa-plus'/>
              <span>添加服务</span>
            </Link>
          </div> */}
        </Title>
        <Search onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((service,index)=> {
              return (
                <tr key={index}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{moment(service.startTime).format('YYYY-MM-DD/HH:mm')}</td>
                    <td>{moment(service.endTime).format('YYYY-MM-DD/HH:mm')}</td>
                    <td>￥{service.unitPrice}.00</td>
                    <td>{service.amount}</td>
                    <td>￥{service.totalPrice}.00</td>
                    <td>{service.sellerId}</td>
                    <td>
                      {/* <Link className='operator' to={`user/parents/detail/${service.id}`}>详情</Link>
                      <Link className='operator' to={`user/parents/edit/${service.id}`}> 编辑</Link> */}
                      <button className='btn btn-primary' onClick={(e)=>{this.deleteService(service.id)}}>删除</button>
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

export default ServiceItem;

