import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Order from './order';
import OrderDetail from './order.detail';


class OrderRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path='/order/order-list' component={Order}/>
        <Redirect exact from='/order' to = '/order/order-list'/>
        <Route path='/order/order-detail/:id' component={OrderDetail}/>
      </Switch>
    );
  }
}

export default OrderRouter;
