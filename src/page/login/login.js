import React, {Component} from 'react';
import './login.css';
import Util from "../../util/util";
import AdminService from '../../service/admin.service';
const _util = new Util();
const _admin = new AdminService();

class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      redirect: _util.getUrlParam('redirect') || ''
    }
  }
  onInputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]:inputValue
    });
  }
  onSubmit(e){
    _admin.login({
      username:this.state.username,
      password: this.state.password
    }).then(res=>{
      this.props.history.push(this.state.redirect);
    },err=> {
      _util.errorTips(err)
    })
  }
  render(){
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="login-panel panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">欢迎登录 - 亲子到家管理系统</h3>
          </div>
          <div className="panel-body">
          <div role="form">
            <div className="form-group">
                  <input type="text" 
                    className="form-control" 
                    placeholder="请输入用户名" 
                    name="username" 
                    autoComplete="off"
                    onChange = {e=>this.onInputChange(e)} 
                  />
                </div>
                <div className="form-group">
                  <input type="password" 
                    className="form-control" 
                    placeholder="请输入密码" 
                    name="password" 
                    onChange = {e=>this.onInputChange(e)} 
                  />
                </div>
                <button type="submit" 
                  className="btn btn-lg btn-primary btn-block"
                  onClick={e => {this.onSubmit(e)}}>登录</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
