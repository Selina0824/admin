import React, {Component} from 'react';
import moment from 'moment';

import Title from '../../../component/page-title/title';
import Pagination from '../../../util/pagnination/pagnination';
import TableList from '../../../component/table-list/table-list';
import OrderSearch from '../../../component/list-search/order-search';
import Util from '../../../util/util';
import ComplaintService from './complaint.service';
import '../../../App.css';

const _util = new Util();
const _complaintService = new ComplaintService();


class Complaint extends Component{
  constructor(props){
    super(props);
    this.state= {
      data:[],
      pageNum:1,
      firstLoading:true,
      listType:'list',
    }
  }

  componentDidMount(){
    this.loadComplaintList();
  }
  //加载服务项目列表
  loadComplaintList(){
    let listParam ={};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，需要加入搜索类型和搜索关键字
    if(this.state.listType ==='search'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    //请求接口
    _complaintService.getComplaintList(listParam).then(res => {
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
      this.loadComplaintList();
    })
  }
  /** 
   * 页数发生改变时执行
  */
  onPageNumChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
      this.loadComplaintList();
    })
  }
  render(){
    let tableHeads = [
        {name:'投诉编号', width:'5%'},
      {name:'投诉订单号', width:'5%'},
      {name:'投诉家长', width:'5%'},
      {name:'被投诉老师', width:'5%'},
      {name:'投诉时间', width:'10%'},
      {name:'投诉原因', width:'30%'},
    //   {name:'操作', width:'5%'}
    ]
    return (
      <div id='page-wrapper'>
        <Title title = '订单列表'/>
        <OrderSearch onSearch = {(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}} searchType='按投诉编号查询'/>
        <TableList tableHeads = {tableHeads} >
          {
            this.state.data.map((complaint,index)=> {
              return (
                <tr key={index}>
                    <td>{complaint.id}</td>
                    <td>{complaint.stOrder.id}</td>
                    <td>{complaint.complainant.name}</td>
                    <td>{complaint.respondent.name}</td>
                    <td>{moment(complaint.complaintTime).format('YYYY-MM-DD HH:mm')}</td>
                    <td>{complaint.reason}</td>
                    {/* <td>
                      <Link className='operator' to={`/order/order-complaint-detail/${complaint.id}`}>查看详情</Link> */}
                      {/* <Link className='operator' to={`/user/parents/edit/${service.id}`}> 编辑</Link> */}
                      {/* <button className='btn btn-primary' onClick={(e)=>{this.deleteService(service.id)}}>删除</button> */}
                    {/* </td> */}
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

export default Complaint;
