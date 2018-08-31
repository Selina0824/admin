import React ,{ Component } from "react";

class TableList extends Component {
  constructor(props){
    super(props);
    this.state={
      isFirstLoading:true
    }
  }
  componentWillReceiveProps(){
    //列表在第一次挂载时为true，其他时候为false；
    this.setState({
      isFirstLoading:false
    })
  }
  render(){
    //列表信息
    let listError = (
      <tr >
        <td colSpan={this.props.tableHeads.length} style={{textAlign:'center'}}>{this.state.isFirstLoading?'正在加载数据 。。。':'没有找到相应的结果~'}</td>
      </tr>
    )
    let listBody = this.props.children;
    let tableHeader = this.props.tableHeads.map((tableHead,index)=>{
      return <th key={index} width={tableHead.width}>{tableHead.name}</th>
    })
    let tableBody = listBody.length>0?listBody:listError;

    return(
      <div className="row">
          <div className="table-wrap col-md-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>{tableHeader}</tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default TableList;