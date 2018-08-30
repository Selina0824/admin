import React ,{Component}from 'react';
import Title from '../../component/page-title/title';
import {Link} from 'react-router-dom';

class ErrorPage extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div id='page-wrapper'>
                <Title title='此页面不存在哦'/>
                <div className='row'>
                    <div className="col-md-12">
                         <span>点我，回到首页 </span>
                         <Link to='/'>返回首页</Link>   
                    </div>
                </div>
            </div>
        );
    }
}
export default ErrorPage;