import React, {Component} from 'react';
import './theme.css';
import './style.css';
import NavTop from '../nav-top/nav-top';
import NavSide from '../nav-side/nav-side';

class Layout extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    return (
      <div id='wrapper'>
        <NavTop/>
        <NavSide/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;