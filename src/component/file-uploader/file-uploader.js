import React, {Component} from 'react';
import FileUpload from './FileUpload';

class FileUploader extends Component{
  render(){
    /*set properties*/
    const options={
      baseUrl:'http://127.0.0.1',
      fileFieldName:'avatar',
      dataType:'json',
      chooseAndUpload:true,
      param:{
        fid:0
      },
      uploadSuccess: (res)=>{
        
      },
      uploadError: (err)=>{

      }
    }
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload">选择图片</button>
      </FileUpload>
    )	        
  }
}

export default FileUploader;
