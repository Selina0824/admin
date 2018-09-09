import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Order from './order-list/order';
import OrderDetail from './order-list/order.detail';
import Complaint from './complaint-list/complaint';


class OrderRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path='/order/order-list' component={Order}/>
        <Redirect exact from='/order' to = '/order/order-list'/>
        <Route path='/order/order-detail/:id' component={OrderDetail}/>
        <Route path='/order/order-complaint' component={Complaint}/>
        <Route path='/order/order-complaint-detail/:id' component={Complaint}/>
      </Switch>
    );
  }
}

export default OrderRouter;
