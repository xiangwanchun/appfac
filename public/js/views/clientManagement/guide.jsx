import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Switch,Carousel} from 'antd';
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
        console.log('---------------------');
        console.log(_this.state.slickGoTo)
          _this.setState({
            slickGoTo: 3
          });
          console.log(_this.state.slickGoTo)
       
        }
     };

    return (
      <div className="mt_15">
        <div className="block_header">
          <span>引导图组</span>
          <Switch defaultChecked={true} onChange={this.onChange} style={{float:'right',marginTop:'6px'}}/>
        </div>
        <Row style={{height:580}}>
          <Col span="9">
            <div className="guide_l">
              <div className="carouselWrap">
                <Carousel {...settings} >
                  <div className="CarouselList"></div>
                  <div className="CarouselList"></div>
                  <div className="CarouselList"></div>
                  <div className="CarouselList"></div>
                </Carousel>
              </div>
            </div>
          </Col>
          <Col span="15">
            <div className="guide_r mt_30">
                <Row>
                  <Col span="3">自定图组:</Col>
                  <Col span="4" className="mr_10">
                    <Upload {...props}>
                      <Button type="primary">
                         点击上传
                      </Button>
                    </Upload>
                  </Col>
                  <Col span="14">图标要求:png格式,1024x1024建议2到4张</Col>
                  <Col span="21" offset="3">
                      <div className="guide_r_con mt_20">
                          <Row type="flex">
                            <Col span="5" className="guide_r_list">
                              <img src="../images/phone_1.png"/>
                            </Col>
                            <Col span="5" className="guide_r_list">
                              <img src="../images/phone_1.png"/>
                            </Col>
                            <Col span="5" className="guide_r_list">
                              <img src="../images/phone_1.png"/>
                            </Col>
                            <Col span="5" className="guide_r_list last_list">
                                <Upload {...props}>
                                  <Icon type="plus"/>
                                </Upload>
                            </Col>
                          </Row>
                      </div>
                  </Col>
                </Row>

            </div>  
          </Col>
        </Row>
      </div>
    );
  }
});

export default  Guide;
