import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

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
  layoutRouter = (
    <Layout>
      <Switch>
        <Route exact path='/' component={Home}/>

        <Route path='/user/parents' component={UserParents}/>
        <Redirect exact from='/user' to = '/user/parents'/>
        <Route path='/user/teachers' component={UserTeacher}/>
        <Route path='/user/register' component={UserTeacherRegister}/>

        <Route path='/schooladmin/school' component={School}/>
        <Route path='/schooladmin/class' component={Clazz}/>
        <Redirect exact from='/schooladmin' to = '/schooladmin/school'/>

        <Route path='/services/items' component={ServiceAdmin}/>
        <Redirect exact from='/services' to = '/services/items'/>

        <Route path='/order/order-list' component={Order}/>
        <Redirect exact from='/order' to = '/order/order-list'/>

        <Route path='/region/address' component={Address}/>
        <Redirect exact from='/region' to = '/region/address'/>
        <Route component={ErrorPage}/>
      </Switch>
    </Layout>
  );
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' render = {
          props => this.layoutRouter
        }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
