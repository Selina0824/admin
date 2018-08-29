import React from 'react';
import { Link } from 'react-router-dom';
import Util from '../../util/util';
import Admin from '../../service/admin.service';

const _util = new Util();
const _admin = new Admin();

class NavTop extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                username: _util.getStorage('userInfo').username
            }
    };
    // 退出登录
    onLogout(){
        _admin.logout().then(res => {
            _util.removeStorage('userInfo');
            window.location.href = '/login';
        }, errMsg => {
            _util.errorTips(errMsg);
        });
    };

    render(){
        return (
          <div className="navbar navbar-default top-navbar">
          <div className="navbar-header">
              <Link className="navbar-brand" to="/"><b>亲子到家</b>后台管理</Link>
          </div>

          <ul className="nav navbar-top-links navbar-right">
              {/* <!-- /.dropdown --> */}
              <li className="dropdown">
                  <a className="dropdown-toggle" href="javascript:;" >
                      <i className="fa fa-user fa-fw"></i>
                      {
                        this.state.username?
                        <span>欢迎，{this.state.username}</span>
                        :<span>欢迎您！</span>
                      }
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                      <li>
                        <span className='logout' onClick = {()=>{this.onLogout()}}>
                          <i className="fa fa-sign-out fa-fw"></i>
                          <span>退出登录</span>
                        </span>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
        );
    }
}

export default NavTop;