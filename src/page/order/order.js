import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import Title from '../../component/page-title/title';
import Pagination from '../../util/pagnination/pagnination';
import TableList from '../../component/table-list/table-list';
import OrderSearch from '../../component/list-search/order-search';
import Util from '../../util/util';
import OrderService from './order.service';
import '../../App.css';

const _orderService = new OrderService();
const _util = new Util();


class Order extends Component{
  constructor(props){
    super(props);
    this.state= {
      data:[],
      pageNum:1,
      firstLoading:true,
      listType:'list',
      status:['等待确认','已接单','等待付款','已完成','已取消','已拒绝']
    }
  }

  componentDidMount(){
    this.loadOrderList();
  }
  //加载服务项目列表
  loadOrderList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _orderService.getOrderList(listParam).then(res => {
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
      this.loadOrderList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadOrderList();
    })
  }
  render(){
    let tableHeads = [
      {name:'订单号', width:'5%'},
      {name:'老师姓名', width:'10%'},
      {name:'家长姓名', width:'15%'},
      {name:'订单状态', width:'10%'},
      {name:'总价', width:'10%'},
      {name:'创建时间', width:'10%'},
      {name:'操作', width:'15%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '订单列表'/>
        <OrderSearch onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads = {tableHeads}>
          {
            this.state.data.map((order,index)=> {
              return (
                <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.seller.name}</td>
                    <td>{order.buyer.name}</td>
                    <td>{this.state.status[order.status]}</td>
                    <td>￥{order.totalPrice}.00</td>
                    <td>{moment(order.openTime).format('YYYY-MM-DD HH:mm')}</td>
                    <td>
                      <Link className='operator' to={`/order/order-detail/${order.id}`}>详情</Link>
                      {/* <Link className='operator' to={`/user/parents/edit/${service.id}`}> 编辑</Link> */}
                      {/* <button className='btn btn-primary' onClick={(e)=>{this.deleteService(service.id)}}>删除</button> */}
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

export default Order;
