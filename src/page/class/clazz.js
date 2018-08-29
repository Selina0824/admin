import React, {Component} from 'react';
import Title from '../../component/page-title/title';

class Clazz extends Component{
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '班级管理'>
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

export default Clazz;
