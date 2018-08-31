import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Region from './region/region';
import RegionEdit from './region/region.edit';
import Address from './address/address';
import AddressEdit from './address/address.edit';

class AddressRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path='/region/region-list' component={Region}/>
        <Redirect exact from='/region' to = '/region/region-list'/>
        <Route path='/region/region-edit' component={RegionEdit}/>
        <Route path='/region/region-add' component={RegionEdit}/>
        <Route path='/region/address-list' component={Address}/>
        <Route path='/region/address-edit' component={AddressEdit}/>
      </Switch>
    );
  }
}

export default AddressRouter;