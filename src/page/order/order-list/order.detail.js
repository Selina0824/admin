import React, {Component} from 'react';
import moment from 'moment';
import Title from '../../../component/page-title/title';
import Util from '../../../util/util';
import OrderService from './order.service';
import TableList from '../../../component/table-list/table-list';
import '../../../App.css';

const _util = new Util();
const _orderService = new OrderService();


class OrderDetail extends Component{
  constructor(props){
    super(props);
    this.state ={
        status:['等待确认','已接单','等待付款','已完成','已取消','已拒绝'],
      id: this.props.match.params.id,
      orderInfo:{
          items:[]
      },
      taxi:0
    }
  }
  componentDidMount(){
    this.loadOrder();
  }
  // 加载订单详情
  loadOrder(){
      let _this = this;
    let listParam = {
        pageNum: 1,
        listType:'search',
        searchType: 'id',
        searchKeyword:this.state.id
      }
      _orderService.getOrderList(listParam).then(res=>{
        this.setState({
            orderInfo:res.data[0]
        },()=>{
            //判断是否有给打车费
            res.data[0].items.forEach((item)=>{
                if(item.type === 3){
                    _this.setState({
                        taxi:1
                    })
                }
            })
        });
      }, err=>{
        _util.errorTips(err)
    })
  }

  render(){
      let order = this.state.orderInfo;
      let tableHeads = [
        {name:'', width:'5%'}, 
        {name:'服务ID', width:'10%'},
        {name:'服务类型', width:'10%'},
        {name:'开始时间', width:'25%'},
        {name:'结束时间', width:'25%'},
        {name:'单价', width:'10%'},
      ]
    return (
      <div id='page-wrapper'>
        <Title title = '订单管理 -- 订单详情'/>
        <div className="row">
          <div className="form-wrap col-md-12">
            <div className="form-horizontal">

              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">订单号</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{order.id}</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">创建时间</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{moment(order.openTime).format('YYYY-MM-DD HH:mm')}</p>
                </div>
              </div>

              {
                  this.state.orderInfo.closeTime?(
                    <div className="form-group">
                    <label htmlFor="name" className="col-md-2 control-label">结束时间</label>
                    <div className="col-md-5">
                        <p className='form-control-static white-background'>{moment(order.closeTime).format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                  </div>
                  ):null
              }

              {/* <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">老师姓名</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{this.state.orderInfo.seller.name}</p>
                </div>
              </div> */}

              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">家长姓名</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{order.buyerId}</p>
                </div>
              </div> 

              {/* <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">联系人信息</label>
                <div className="col-md-5">
                    <p className='form-control-static'>{this.state.orderInfo.userName} {this.state.orderInfo.userPhone} {this.state.orderInfo.address}</p>
                </div>
              </div> */}
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">提供打车费</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{this.state.taxi?'是':'否'}</p>
                </div>
              </div> 
              
              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">订单金额</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{order.totalPrice}元</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="col-md-2 control-label">订单状态</label>
                <div className="col-md-5">
                    <p className='form-control-static white-background'>{this.state.status[order.status]}</p>
                </div>
              </div>

              {
                  this.state.orderInfo.score?(
                    <div className="form-group">
                    <label htmlFor="name" className="col-md-2 control-label">评分</label>
                    <div className="col-md-5">
                        <p className='form-control-static white-background'>{order.score}</p>
                    </div>
                  </div>
                  ):null
              }



            </div>
          </div>
        </div>
        <hr/>
        <TableList tableHeads = {tableHeads}>
          {
            order.items.map((item,index)=> {
              if(item.type === 3){
                  return null;
              } else {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{moment(item.startTime).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</td>
                        <td>￥ {item.unitPrice}.00</td>
                    </tr>
                  )
              }
            })
          }
        </TableList>
      </div>
    )
  }
}

export default OrderDetail;

