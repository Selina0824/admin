import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import UserParents from './user-parents/user-parents';
import UserTeacher from './user-teachers/user-teacher';
import UserTeacherRegister from './user-teacher-register/user-teacher-register';
import ParentsEdit from './user-parents/user-parents-edit';
import ParentsDetail from './user-parents/user-parents.detail';
import TeacherEdit from './user-teachers/user-teacher-edit';
import TeacherDetail from './user-teachers/user-teacher.detail';
import TeacherRegisterDetail from './user-teacher-register/user-teacher-register-detail'

class UserRouter extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/user/parents' component={UserParents}/>
        <Redirect exact from='/user' to = '/user/parents'/>
        <Route path='/user/teachers' component={UserTeacher}/>
        <Route exact path='/user/teacher-register' component={UserTeacherRegister}/>
        <Route path='/user/teacher-register/detail/:id' component={ParentsDetail}/>

        <Route path='/user/parents/add/' component={ParentsEdit}/>
        <Route path='/user/parents/edit/:id' component={ParentsEdit}/>
        <Route path='/user/parents/detail/:id' component={ParentsDetail}/>

        <Route path='/user/teacher/add/' component={TeacherEdit}/>
        <Route path='/user/teacher/edit/:id' component={TeacherEdit}/>
        <Route path='/user/teacher/detail/:id' component={TeacherDetail}/>
      </Switch>
    );
  }
}

export default UserRouter;
