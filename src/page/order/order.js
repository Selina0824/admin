import React, {Component} from 'react';
import Title from '../../component/page-title/title';

class Order extends Component{
  render(){
    return (
      <div id='page-wrapper'>
        <Title title = '订单管理'>
        </Title>
        <div className='row'>
          <div className='col-md-12'>
          </div>
        </div>
      </div>
    )
  }
}

export default Order;
