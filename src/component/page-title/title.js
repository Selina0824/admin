import React, {Component} from 'react';
import{NavLink,Link} from 'react-router-dom';

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
          <h3 className='page-header'>{this.props.title}</h3>
          {/* <ol className="breadcrumb">
            {this.props.tabs.map(tab=>{
                {
                    tab.active?(<li className="active">{tab.title}</li>):(<li><a href={tab.href}>{tab.title}}</a></li>)
                }
            })}
          </ol> */}
          {this.props.children}        
           {/* 作为容器使用 */}
        </div>
      </div>
    )
  }
}

export default Title;