import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button, Modal} from 'antd';

const UpdataTip = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    console.log('点击了确定');
    this.setState({
      visible: false
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  render() {
    return (
      <div className="updataTip mt_30">
          <p>
          	  <Icon type="exclamation-circle" className="updataTipIcon"/>
          		APP母板已经升级，建议您重新打包 
          	  <a className="UpdatedInstructions" onClick={this.showModal}>更新说明</a>  
          	  <Button type="primary" size="small" className="UpdatedBtn">点击生成APP</Button>
          </p>
           <Modal title="更新说明" visible={this.state.visible}
                 onCancel={this.handleCancel} footer={[
            <Button key="back" type="primary" size="large" onClick={this.handleCancel}>返 回</Button>,
          ]} >
                <p>1、对话框的内容</p>
                <p>2、对话框的内容</p>
                <p>3、对话框的内容</p>
                <p>4、对话框的内容</p>
                <p>5、对话框的内容</p>
                <p>6、对话框的内容</p>
                <p>7、对话框的内容</p>
                <p>8、对话框的内容</p>
                <p>9、对话框的内容</p>
           </Modal>
      </div>
    );
  }

});

export default  UpdataTip;
