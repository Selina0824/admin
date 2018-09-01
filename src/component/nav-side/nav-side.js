import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavSide extends React.Component{
    // constructor(props){
    //         super(props);
    // };
    render(){
        return (
          <div className="navbar-default navbar-side" role="navigation">
          <div className="sidebar-collapse">
              <ul className="nav" id="main-menu">

                  <li>
                      <NavLink exact activeClassName='active-menu' to="/">
                      <i className="fa fa-dashboard"></i>
                       <span>首页</span></NavLink>
                  </li>
                  <li className='active'>
                      <Link to="/user">
                      <i className="fa fa-user"></i>
                       <span>用户</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <NavLink activeClassName='active-menu' to="/user/parents">家长管理</NavLink>
                          </li>
                          <li>
                              <NavLink activeClassName='active-menu' to="/user/teachers">老师管理</NavLink>
                          </li>
                          <li>
                              <NavLink activeClassName='active-menu' to="/user/register">老师注册管理</NavLink>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/school">
                      <i className="fa fa-building"></i>
                       <span>学校</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <NavLink activeClassName='active-menu' to="/school/school-list">学校管理</NavLink>
                          </li>
                          <li>
                              <NavLink activeClassName='active-menu' to="/school/class-list">班级管理</NavLink>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/services">
                      <i className="fa fa-leaf"></i>
                       <span>服务</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <NavLink activeClassName='active-menu' to="/services/items">服务项目管理</NavLink>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/order">
                      <i className="fa fa-check-square-o fa-fw"></i>
                       <span>订单</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <NavLink activeClassName='active-menu' to="/order/order-list">订单管理</NavLink>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/region">
                      <i className="fa fa-map-marker"></i>
                       <span>地址</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <NavLink activeClassName='active-menu' to="/region/region-list">地区管理</NavLink>
                          </li>
                          <li>
                              <NavLink activeClassName='active-menu' to="/region/address-list">地址管理</NavLink>
                          </li>
                      </ul>
                  </li>
              </ul>

          </div>

      </div>
        );
    }
}

export default NavSide;