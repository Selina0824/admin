import React, {Component} from 'react';
import{NavLink,Link} from 'react-router-dom';

class Title extends Component {
  // constructor(props){
  //   super(props)
  // }
  componentWillMount(){
    document.title = this.props.title + '- 亲子到家';
  }
  render(){
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='page-header'>{this.props.title}</h3>
          {/* <ol class="breadcrumb">
            <li><Link className='active' to= '/'/>首页</li>
            <li><Link className='active' to= '/'/>首页</li>
          </ol> */}
          {this.props.children}        
           {/* 作为容器使用 */}
        </div>
      </div>
    )
  }
}

export default Title;