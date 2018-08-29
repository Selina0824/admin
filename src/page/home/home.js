import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import Title from '../../component/page-title/title';

import Util from '../../util/util';
import Statistic from '../../service/statistic.service'

const _util = new Util();
const _statistic = new Statistic();


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      parentsCount:'123',
      teachersCount:'456',
      orderCount:'789'
    }
  }
  componentDidMount(){
    this.loadCount();
  }
  loadCount(){
    _statistic.getHomeCount().then(res=>{
      this.setState(res);

    },err=>{
      _util.errorTips(err);
    })
  }
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '首页'></Title>
        <div class="row">
          <div class="col-md-4">
            <Link class="color-box brown" to="/user_parents">
              <p class="count">{this.state.parentsCount}</p>
              <p class="desc"><i class="fa fa-user"></i><span>家长总数</span></p>
            </Link>
          </div>
          <div class="col-md-4">
            <Link class="color-box green" to="/user_teachers">
              <p class="count">{this.state.teachersCount}</p>
              <p class="desc"><i class="fa fa-user-o"></i><span>老师总数</span></p>
            </Link>
          </div>
          <div class="col-md-4">
            <Link class="color-box blue" to="/order">
              <p class="count">{this.state.orderCount}</p>
              <p class="desc"><i class="fa fa-check-square-o"></i><span>订单总数</span></p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
