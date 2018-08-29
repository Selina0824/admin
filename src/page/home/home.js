import React, {Component} from 'react';
import './home.css';
import Title from '../../component/page-title/title';

class Home extends Component{
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '首页'>
          <button></button>
        </Title>
        <div className='row'>
          <div className='col-md-12'>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
