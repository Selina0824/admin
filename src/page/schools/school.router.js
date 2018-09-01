import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import School from './school/school';
import SchoolEdit from './school/school.edit';
import SchoolDetail from './school/school.detail';
import Clazz from './class/clazz';
import ClazzEdit from './class/clazz-edit';

class AddressRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path='/school/school-list' component={School}/>
        <Route path='/school/class-list' component={Clazz}/>
        <Redirect exact from='/school' to = '/school/school-list'/>
        <Route path='/school/school-edit/:id' component={SchoolEdit}/>
        <Route path='/school/detail/:id' component={SchoolDetail}/>
        <Route path='/school/class-edit' component={ClazzEdit}/>
        <Route path='/school/school-add' component={SchoolEdit}/>
        <Route path='/school/class-add' component={ClazzEdit}/>
      </Switch>
    );
  }
}

export default AddressRouter;