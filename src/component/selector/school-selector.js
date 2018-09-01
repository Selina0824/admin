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
      schoolList: [],
      schoolId: '',
      clazzList:[],
      clazzId:''
    }
  }
  componentDidMount(){
    this.loadSchoolList();
  }
  componentWillReceiveProps(nextProps){
    
  }
  //加载学校
  loadSchoolList(){
    let listParam = {
      size:10000,
      listType : 'search',
      searchType: 'regionId',
      searchKeyword: this.state.thirdRegionId,
      pageNum:1
    }
    _schoolService.getSchoolList(listParam).then(res=>{
      this.setState({
        forthRegionList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  //加载班级
  loadClazzList(){
    let listParam = {
      size:10000,
      id:this.state.schoolId
    }
    _regionService.getRegionList(listParam).then(res=>{
      this.setState({
        forthRegionList:res.data
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
        clazzList:[]
      },()=>{
        this.loadClazzList();
        this.onPropsRegionChange();
      })
    }
  }
   //选择班级
   onClazzChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        clazzId: newId,
      },()=>{
        this.onPropsRegionChange();
      })
    }
  }
  //传给父组件选中的结果
  onPropsRegionChange(){

  }
  render (){
    return (
      <div className="col-md-10">
        <select className="form-control cate-select" onChange = {(e)=>{this.onSchoolChange(e)}}>
              <option value="">请选择学校</option>
              {
                this.state.thirdRegionList.map(
                  (region, index)=><option value = {region.id} key={index}>{region.name}</option>
                )
              }
        </select>
        {
          this.state.clazzList.length?(
            <select className="form-control cate-select" onChange = {(e)=>{this.onClazzChange(e)}}>
              <option value="">请选择班级</option>
              {
                this.state.thirdRegionList.map(
                  (region, index)=><option value = {region.id} key={index}>{region.name}</option>
                )
              }
            </select>
          ):null
        }
      </div>
    )
  }
}

export default RegionSelector;
