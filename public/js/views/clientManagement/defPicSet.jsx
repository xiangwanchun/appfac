import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload} from 'antd'
const props = {
  name: 'file',
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  }
};



const DefPicSet = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0
    };
  },
  pointToFun(type,val){
      if(type == 'Switch'){

      }else{

      }
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="t_center">
          <Upload {...props}>
            <Button type="primary" size="large">
              <Icon type="upload" /> 点击上传默认图
            </Button>
          </Upload> 
      </div>
    );
  }
});

export default  DefPicSet;
