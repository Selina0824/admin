import React, {Component} from 'react';
import Title from '../../component/page-title/title';

class School extends Component{
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '学校管理'>
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

export default School;
