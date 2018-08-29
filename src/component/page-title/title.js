import React, {Component} from 'react';

class Title extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    document.title = this.props.title + '- 亲子到家';
  }
  render(){
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='page-header'>{this.props.title}</h1>
          {this.props.children}        
           {/* 作为容器使用 */}
        </div>
      </div>
    )
  }
}

export default Title;