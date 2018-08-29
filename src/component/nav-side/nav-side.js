import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavSide extends React.Component{
    constructor(props){
            super(props);
    };
    render(){
        return (
          <div className="navbar-default navbar-side" role="navigation">
          <div className="sidebar-collapse">
              <ul className="nav" id="main-menu">

                  <li>
                      <NavLink activeClassName='active-menu' to="/">
                      <i className="fa fa-dashboard"></i>
                       <span>首页</span></NavLink>
                  </li>
                  <li className='active'>
                      <Link to="/">
                      <i className="fa fa-user"></i>
                       <span>用户</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <Link to="/">家长管理</Link>
                          </li>
                          <li>
                              <Link to="/">老师管理</Link>
                          </li>
                          <li>
                              <Link to="/">老师注册管理</Link>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/">
                      <i className="fa fa-list"></i>
                       <span>学校</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <Link to="/">学校管理</Link>
                          </li>
                          <li>
                              <Link to="/">班级管理</Link>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/">
                      <i className="fa fa-list"></i>
                       <span>服务</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <Link to="/">服务项目管理</Link>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/">
                      <i className="fa fa-check-square-o fa-fw"></i>
                       <span>订单</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <Link to="/">订单管理</Link>
                          </li>
                      </ul>
                  </li>
                  <li className='active'>
                      <Link to="/">
                      <i className="fa fa-list"></i>
                       <span>地区</span>
                       <span className="fa arrow"></span></Link>
                      <ul className="nav nav-second-level collapse in">
                          <li>
                              <Link to="/">地址管理</Link>
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