import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';

import Layout from './component/layout/layout';
import Home from './page/home/home';
import UserParents from './page/user/user-parents/user-parents';
import UserTeacher from './page/user/user-teachers/user-teacher';
import UserTeacherRegister from './page/user/user-teacher-register/user-teacher-register';
import School from './page/school/school';
import Clazz from './page/class/clazz';
import Order from './page/order/order';
import ServiceAdmin from './page/service-admin/service-admin';
import Address from './page/address/address';
import Login from './page/login/login';
import ErrorPage from './page/error-page/error-page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' render = {
          props => (
            <Layout>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/user_parents' component={UserParents}/>
                <Route path='/user_teachers' component={UserTeacher}/>
                <Route path='/user_register' component={UserTeacherRegister}/>
                <Route path='/school' component={School}/>
                <Route path='/class' component={Clazz}/>
                <Route path='/services' component={ServiceAdmin}/>
                <Route path='/order' component={Order}/>
                <Route path='/region' component={Address}/>
                <Route component={ErrorPage}/>
              </Switch>
            </Layout>
          )
        }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
