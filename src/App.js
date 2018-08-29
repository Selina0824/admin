import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import Home from './page/home/home';
import Layout from './component/layout/layout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user_parents' component={Home}/>
            <Route path='/user_teachers' component={Home}/>
            <Route path='/user_register' component={Home}/>
            <Route path='/school' component={Home}/>
            <Route path='/class' component={Home}/>
            <Route path='/services' component={Home}/>
            <Route path='/order' component={Home}/>
            <Route path='/region' component={Home}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
