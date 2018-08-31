import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Layout from './component/layout/layout';
import Home from './page/home/home';
import UserRouter from './page/user/user.router';
import ServiceRouter from './page/service-item/service-router';
import AddressRouter from './page/address/region.router';
import SchoolRouter from './page/schools/school.router';
import Order from './page/order/order';
import Login from './page/login/login';
import ErrorPage from './page/error-page/error-page';

class App extends Component {
  
  render() {
    let layoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/user' component={UserRouter}/>
          <Route path='/school' component={SchoolRouter}/>
          <Route path='/services' component={ServiceRouter}/>
          <Route path='/order/order-list' component={Order}/>
          <Redirect exact from='/order' to = '/order/order-list'/>
  
          <Route path='/region' component={AddressRouter}/>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout>
    );
    return (
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' render = {
          props => layoutRouter
        }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
