import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import Title from '../../component/page-title/title';

import Util from '../../util/util';
import UserService from '../user/user.service';
import SchoolService from '../schools/school.service';
import ServiceItemService from '../service-item/service-item.service';
import OrderService from '../order/order.service';

const _util = new Util();
const _userService  = new UserService();
const _schoolService = new SchoolService();
const _serviceItemService = new ServiceItemService();
const _orderService = new OrderService();

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      parentsCount:'-',
      teachersCount:'-',
      schoolsCount:'-',
      serviceCount:'-',
      orderCount:'-',
      complaintCount:'-'
    }
  }
  componentDidMount(){
    this.loadCount();
  }
  loadCount(){
    //获取注册家长数量
    let listParam= {
      pageNum:1
    }
    _userService.getParentsList(listParam).then(res=>{
      this.setState({
        parentsCount:res.total
      });
    },err=>{
      _util.errorTips(err);
    });

    //获取注册老师数量
    _userService.getTeacherList(listParam).then(res=>{
      this.setState({
        teachersCount:res.total
      });
    },err=>{
      _util.errorTips(err);
    })

    //获取注册学校数量
    _schoolService.getSchoolList(listParam).then(res=>{
      this.setState({
        schoolsCount:res.total
      });
    },err=>{
      _util.errorTips(err);
    });

    //获取服务数量
    _serviceItemService.getServicesList(listParam).then(res=>{
        this.setState({
            serviceCount: res.total
        })
    }, err=>_util.errorTips(err));

    //获取订单数量
    _orderService.getOrderList(listParam).then(res=>{
        this.setState({
            orderCount:res.total
        })
    },err=>_util.errorTips(err));

  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '首页'></Title>
        <div className="row">
          <div className="col-md-4">
            <Link className="color-box brown" to="/user/parents">
              <p className="count">{this.state.parentsCount}</p>
              <p className="desc"><i className="fa fa-user"></i><span>家长总数</span></p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="color-box slate-green" to="/user/teachers">
              <p className="count">{this.state.teachersCount}</p>
              <p className="desc"><i className="fa fa-user-o"></i><span>老师总数</span></p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="color-box grey" to="/school/school-list">
              <p className="count">{this.state.schoolsCount}</p>
              <p className="desc"><i className="fa fa-building"></i><span>学校总数</span></p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="color-box green" to="/services/items">
              <p className="count">{this.state.serviceCount}</p>
              <p className="desc"><i className="fa fa-leaf"></i><span>服务总数</span></p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="color-box blue" to="/order/order-list">
              <p className="count">{this.state.orderCount}</p>
              <p className="desc"><i className="fa fa-check-square-o"></i><span>订单总数</span></p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="color-box pink" to="/order/order-complaint">
              <p className="count">{this.state.complaintCount}</p>
              <p className="desc"><i className="fa fa-thumbs-down"></i><span>投诉总数</span></p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
