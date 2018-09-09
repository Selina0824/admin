import React from 'react';
import RCpagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用分页组件
class Pagination extends React.Component{
    render(){
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <RCpagination {...this.props} 
                    hideOnSinglePage 
                    showQuickJumper/>
                </div>
            </div>
        );
    }
}
export default Pagination;