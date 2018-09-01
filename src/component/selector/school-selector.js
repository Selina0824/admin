import React,{Component} from 'react';
import './selector.css';
import SchoolService from '../../page/schools/school.service';
import Util from '../../util/util';

const _schoolService  = new SchoolService();
const _util = new Util();

class SchoolSelector extends Component{
  constructor(props){
    super(props)
    this.state = {
      schoolList:[],
      schoolId:''
    }
  }
  componentDidMount(){
    this.loadSchoolList();
  }
  componentWillReceiveProps(nextProps){
    let schoolIdChange = this.state.schoolId !== nextProps.schoolId;
    if(!schoolIdChange){
      return;
    } else {
      this.setState({
        schoolId:nextProps.schoolId
      })
    }
  }
  //加载学校列表
  loadSchoolList(){
    let listType = 'list'
    let listParam = {
      pageNum:1,
      size: 10000,
      listType:listType
    }
    _schoolService.getSchoolList(listParam).then(res=>{
      this.setState({
        schoolList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  
  //选择学校
  onSchoolChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        schoolId: newId
      },()=>{
        this.onPropsChange();
      })
    }
  }
   
  //传给父组件选中的结果
  onPropsChange(){
    //判断props中回调方法是否存在
    let propsChangable = typeof this.props.onSchoolChange === 'function';
      propsChangable && this.props.onSchoolChange(this.state.schoolId);
  }
  render (){
    return (
      <div className="col-md-10">
        <select className="form-control cate-select-school" 
          disabled = {this.props.readOnly === '2'} 
          value = {this.state.schoolId}
          onChange = {(e)=>{this.onSchoolChange(e)}}>
          <option value="">请选择学校</option>
            {
              this.state.schoolList.map(
                (school, index)=><option value = {school.id} key={index}>{school.name}</option>
              )
            }
        </select>
      </div>
    )
  }
}

export default SchoolSelector;
