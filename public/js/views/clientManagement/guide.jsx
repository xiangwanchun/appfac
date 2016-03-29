import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Switch,Carousel} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Guide = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      slickGoTo:2
    };
  },
  handleClick(e) {
        clientManagement
  },
  onChange(checked) {
    console.log('switch to ' + checked);
  },
  beforeChange(a,b){
   /* slickGoTo(3);*/
    console.log(a);
    console.log(b);
  },
  render() {
    var _this = this;
    var settings = {
       dots: true,
       infinite: true,
       autoplay:true,
       speed: 500,
       slidesToShow: 1,
       slidesToScroll: 1,
       slickGoTo: 3,
       beforeChange(to,form){
  
          _this.setState({
            slickGoTo: 3
          });

        }
     };

     const props = {
              action: '/upload.do',
              listType: 'picture-card',
              defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
              }]
            };

    return (



        <div className="clearfix">
          <Upload {...props}>
            <Icon type="plus" />
            <div className="ant-upload-text">上传照片</div>
          </Upload>

            <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" className="upload-example">
            <img src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
            <span>示例</span>
          </a>
        </div>

        
    );
  }
});

export default  Guide;
