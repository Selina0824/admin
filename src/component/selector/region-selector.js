import React,{Component} from 'react';
import './selector.css';
import RegionService from '../../page/address/region.service';
import SchoolService from '../../page/schools/school.service';
import Util from '../../util/util';

const _regionService = new RegionService();
const _schoolService  = new SchoolService();
const _util = new Util();

class RegionSelector extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstRegionList:[],
      firstRegionId:'',
      secondRegionList:[],
      secondRegionId: '',
      thirdRegionList : [],
      thirdRegionId : '',
      // schoolList: [],
      // schoolId: '',
      // clazzList:[],
      // clazzId:''
    }
  }
  componentDidMount(){
    this.loadFirstRegionList();
  }
  //加载一级地区
  loadFirstRegionList(){
    let listParam = {
      pageNum:1,
      size: 10000,
      listType:'search',
      searchType:'level',
      searchKeyword:0
    }
    _regionService.getRegionList(listParam).then(res=>{
      this.setState({
        firstRegionList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  //加载二级地区
  loadSecondRegionList(){
    let listParam = {
      size:10000,
      id:this.state.firstRegionId
    }
    _regionService.getRegionList(listParam).then(res=>{
      this.setState({
        secondRegionList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  //加载三级地区
  loadThirdRegionList(){
    let listParam = {
      size:10000,
      id:this.state.secondRegionId
    }
    _regionService.getRegionList(listParam).then(res=>{
      this.setState({
        thirdRegionList:res.data
      })
    }, err => {
      _util.errorTips(err)
    })
  }
  // //加载学校
  // loadSchoolList(){
  //   let listParam = {
  //     size:10000,
  //     listType : 'search',
  //     searchType: 'regionId',
  //     searchKeyword: this.state.thirdRegionId,
  //     pageNum:1
  //   }
  //   _schoolService.getSchoolList(listParam).then(res=>{
  //     this.setState({
  //       forthRegionList:res.data
  //     })
  //   }, err => {
  //     _util.errorTips(err)
  //   })
  // }
  // //加载班级
  // loadClazzList(){
  //   let listParam = {
  //     size:10000,
  //     id:this.state.schoolId
  //   }
  //   _regionService.getRegionList(listParam).then(res=>{
  //     this.setState({
  //       forthRegionList:res.data
  //     })
  //   }, err => {
  //     _util.errorTips(err)
  //   })
  // }
  //选择一级地区
  onFirstRegionChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        firstRegionId: newId,
        secondRegionList: []
      },()=>{
        //更新二级地区
        this.loadSecondRegionList();
        this.onPropsRegionChange();
      })
    }
  }
   //选择二级地区
   onSecondRegionChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        secondRegionId: newId,
        thirdRegionList: []
      },()=>{
        //更新三级地区
        this.loadThirdRegionList();
        this.onPropsRegionChange();
      })
    }
  }
   //选择三级地区
   onThirdRegionChange(e){
    if(e.target.value){
      let newId  = e.target.value;
      this.setState({
        thirdRegionId: newId,
        // schoolList: []
      },()=>{
        //更新学校列表
        // this.loadSchoolList();
        this.onPropsRegionChange();
      })
    }
  }
  //  //选择学校
  //  onSchoolChange(e){
  //   if(e.target.value){
  //     let newId  = e.target.value;
  //     this.setState({
  //       schoolId: newId,
  //       clazzList:[]
  //     },()=>{
  //       this.loadClazzList();
  //       this.onPropsRegionChange();
  //     })
  //   }
  // }
  //  //选择班级
  //  onClazzChange(e){
  //   if(e.target.value){
  //     let newId  = e.target.value;
  //     this.setState({
  //       clazzId: newId,
  //     },()=>{
  //       this.onPropsRegionChange();
  //     })
  //   }
  // }
  //传给父组件选中的结果
  onPropsRegionChange(){
    //判断props中回调方法是否存在
    let regionChangable = typeof this.props.onRegionChange === 'function';
    if(this.state.thirdRegionId){
      //如果有三级地区
      regionChangable && this.props.onRegionChange(this.state.thirdRegionId);
    } else if (this.state.secondRegionId){
      //如果只有二级地区
      regionChangable && this.props.onRegionChange(this.state.secondRegionId);
    } else if (this.state.firstRegionId){
      //如果只有一级地区
      regionChangable && this.props.onRegionChange(this.state.firstRegionId);
    }
  }
  render (){
    return (
      <div className="col-md-10">
        <select className="form-control cate-select" onChange = {(e)=>{this.onFirstRegionChange(e)}}>
        <option value="">请选择省份</option>
          {
            this.state.firstRegionList.map(
              (region, index)=><option value = {region.id} key={index}>{region.name}</option>
            )
          }
        </select>
        {this.state.secondRegionList.length?(
          <select className="form-control cate-select" onChange = {(e)=>{this.onSecondRegionChange(e)}}>
            <option value="">请选择城市</option>
            {
              this.state.secondRegionList.map(
                (region, index)=><option value = {region.id} key={index}>{region.name}</option>
              )
            }
          </select>
        ):null
        }
        {
          this.state.thirdRegionList.length?(
            <select className="form-control cate-select" onChange = {(e)=>{this.onThirdRegionChange(e)}}>
              <option value="">请选择区/县</option>
              {
                this.state.thirdRegionList.map(
                  (region, index)=><option value = {region.id} key={index}>{region.name}</option>
                )
              }
            </select>
          ):null
        }
        {/* {
          this.state.schoolList.length?(
            <select className="form-control cate-select" onChange = {(e)=>{this.onSchoolChange(e)}}>
              <option value="">请选择学校</option>
              {
                this.state.thirdRegionList.map(
                  (region, index)=><option value = {region.id} key={index}>{region.name}</option>
                )
              }
            </select>
          ):null
        }
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
        } */}
      </div>
    )
  }
}

export default RegionSelector;
