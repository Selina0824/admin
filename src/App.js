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
            <Redirect from ='*' to='/'/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
