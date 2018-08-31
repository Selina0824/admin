import React ,{ Component } from "react";
import './list-search.css';

class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      searchType:'productId',
      searchKeyword:''
    }
  }
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  onSearch(){
    this.props.onSearch(this.state.searchType,this.state.searchKeyword);
  }
  onSearchKeywordKeyup(e){
    if(e.keyCode === 13){
      this.onSearch();
    }
  }
  render(){
    return(
      <div className="row">
          <div className="search-wrap col-md-12">
            <div className="form-inline">
                <div className="form-group">
                  <select className="form-control"
                    name='searchType'
                    onChange = {(e)=>{this.onValueChange(e)}}>
                    <option value="productId">按id查询</option>
                    <option value="productName">按姓名查询</option>
                  </select>
                </div>
              <div className="form-group">
                <input type="text" 
                  name='searchKeyword'
                  className="form-control" 
                  placeholder="关键词"
                  onKeyUp = {(e)=>{this.onSearchKeywordKeyup(e)}}
                  onChange = {(e)=>{this.onValueChange(e)}}/>
              </div>
              <button className="btn btn-default"   onClick={(e)=>this.onSearch()}>查询</button>
            </div>
          </div>
      </div>
    )
  }
}

export default Search;