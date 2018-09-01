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
      schoolId:'',
      clazzList:[],
      clazzId: ''
    }
  }
  componentDidMount(){
    this.loadSchoolList();
  }
  componentWillReceiveProps(nextProps){
    let schoolIdChange = this.state.schoolId !== nextProps.schoolId;
    let clazzIdChange = this.state.clazzId !== nextProps.clazzId;
    
    // 如果只有两级地区
    if(nextProps.thirdRegionId == 0){
      //数据没有发生变化
      if(!firstRegionIdChange && !secondRegionIdChange){
        return;
      }
      this.setState({
        firstRegionId:nextProps.firstRegionId,
        secondRegionId: nextProps.secondRegionId,
        thirdRegionId : ''
      },()=>{
         this.loadSecondRegionList();
      })
    } else{
      if(!firstRegionIdChange && !secondRegionIdChange && !thirdRegionIdChange){
        return;
      }
      //有三级区域
      this.setState({
        firstRegionId:nextProps.firstRegionId,
        secondRegionId: nextProps.secondRegionId,
        thirdRegionId : nextProps.thirdRegionId
      },()=>{
        this.loadSecondRegionList();
        this.loadThirdRegionList();
      })
    }
  }
  //加载学校列表
  loadSchoolList(){
    let listType = this.props.regionId? 'search':'list'
    let listParam = {
      pageNum:1,
      size: 10000,
      listType:listType,
      searchType:'regionId',
      searchKeyword:Tthis.props.regionId
    }
    _schoolService.getSchoolList(listParam).then(res=>{
      this.setState({
        schoolList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  //加载学校
  loadClazzList(){
    let listParam = {
      size:10000,
      id:this.state.schoolId
    }
   _schoolService.getClazzList(listParam).then(res=>{
      this.setState({
        clazzList:res.data
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
        schoolId: newId,
        clazzList: []
      },()=>{
        //更新班级列表
        this.loadClazzList();
        this.onPropsChange();
      })
    }
  }
   //选择二级地区
  onClazzChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        clazzId: newId
      },()=>{
        this.onPropsChange();
      })
    }
  }
   
  //传给父组件选中的结果
  onPropsChange(){
    //判断props中回调方法是否存在
    let propsChangable = typeof this.props.onPropsChange === 'function';
    if (this.state.clazzId){
      //如果选择了班级
      propsChangable && this.props.onPropsChange(this.state.schoolId,this.state.clazzId);
    } else if (this.state.firstRegionId){
      //如果只选择了学校
      propsChangable && this.props.onPropsChange(this.state.schoolId,0);
    } 
  }
  render (){
    return (
      <div className="col-md-10">
        <select className="form-control cate-select" 
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
        {this.state.clazzList.length?(
          <select className="form-control cate-select" 
            disabled= {this.props.readOnly === '2'} 
            value = {this.state.clazzId}
            onChange = {(e)=>{this.onClazzChange(e)}}>
            <option value="">请选择班级</option>
            {
              this.state.clazzList.map(
                (clazz, index)=><option value = {clazz.id} key={index}>{clazz.name}</option>
              )
            }
          </select>
        ):null
        }
      </div>
    )
  }
}

export default SchoolSelector;
