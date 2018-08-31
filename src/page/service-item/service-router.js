import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import ServiceItem from './service-item';
import ServiceEdit from './service-edit';


class ServiceRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path='/services/items' component={ServiceItem}/>
        <Redirect exact from='/services' to = '/services/items'/>
        <Route path='/services/add' component={ServiceEdit}/>
      </Switch>
    );
  }
}

export default ServiceRouter;
