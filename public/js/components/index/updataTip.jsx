import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button} from 'antd';

const UpdataTip = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  render() {
    return (
      <div className="updataTip mt_30">
          <p>
          	  <Icon type="exclamation-circle" className="updataTipIcon"/>
          		APP母板已经升级，建议您重新打包 
          	  <a className="UpdatedInstructions">更新说明</a>  
          	  <Button type="primary" size="small" className="UpdatedBtn">点击生成APP</Button>
          </p>
      </div>
    );
  }

});

export default  UpdataTip;
