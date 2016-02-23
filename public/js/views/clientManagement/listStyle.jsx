import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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

const ListStyle = React.createClass({
  getInitialState() {
    return {
      current: 'base'
    };
  },
  handleClick(e) {
        clientManagement
  },
  render() {

    return (
      <div className="mt_30" id="bootScreenmain">
        <Row >
          <Col span="9">
            <div className="bootScreen_l">

            </div>
          </Col>
          <Col span="15">
            <div className="bootScreen_r">
                <p>
                  <label>自定义开机画面: </label>
                  图标要求:png格式,1024x1024
                </p>
                <div className="mt_15">
                  <Upload {...props}>
                    <Button type="primary">
                       点击上传
                    </Button>
                  </Upload>
                </div>
            </div>  
          </Col>
        </Row>
      </div>
    );
  }
});

export default  ListStyle;
