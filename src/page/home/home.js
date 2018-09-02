import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import Title from '../../component/page-title/title';

import Util from '../../util/util';
import UserService from '../user/user.service';
import SchoolService from '../schools/school.service';

const _util = new Util();
const _userService  = new UserService();
const _schoolService = new SchoolService();


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      parentsCount:'-',
      teachersCount:'-',
      schoolsCount:'-'
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
            <Link class="color-box blue" to="/school">
              <p class="count">{this.state.schoolsCount}</p>
              <p class="desc"><i class="fa fa-check-square-o"></i><span>学校总数</span></p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
