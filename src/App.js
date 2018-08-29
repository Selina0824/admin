import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import Home from './page/home/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Redirect from ='*' to='/'/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
