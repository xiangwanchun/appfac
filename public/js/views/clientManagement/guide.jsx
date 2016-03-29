import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Switch,Carousel,Modal,message} from 'antd';
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
    //上传变换的时候
  uploadChange(name,info){

    console.log(name + '===============');
    console.log(info);
    return;
    let fileList = info.fileList;

    // 1. 上传列表数量的限制
    //    只显示最近上传的一个，旧的会被新的顶掉
    fileList = fileList.slice(-2);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.url;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var data = this.state.data;
          data[name] = info.file.response.data.src;
          this.setState({
              data
          })
        }else{
          var errorsDes = typeof info.file.response.error.description;
          Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} ${errorsDes}`
          });
        }                  
      }else if (info.file.status === 'error') {
        Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} 上传失败。`
          });
      }
  },
  onChange(checked) {
    console.log('switch to ' + checked);
  },
  beforeChange(a,b){

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

      const guide1 = {
              action: '/factory/upload',
              name: 'file',
              showUploadList: false,
              multiple : true,
              onChange(info) {
                  _this.uploadChange('batch',info);              
              },
            };

     const guide2 = {
              action: '/factory/upload',
              listType: 'picture-card',
              name: 'file',
              onChange(info) {
                _this.uploadChange('single',info);              
              },
              defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl: '../images/phone_1.png',
              }]
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
                    <Upload {...guide1} data={{"type" :'guide'}}>
                      <Button type="primary">
                         点击上传
                      </Button>
                    </Upload>
                  </Col>
                  <Col span="14">图标要求:png格式,1024x1024建议2到4张</Col>
                  <Col span="21" offset="3">
                      <div className="guide_r_con mt_20">

                          <div className="clearfix">
                            <Upload {...guide2} data={{"type" :'guide'}}>
                              <Icon type="plus" />
                            </Upload>
                          </div>

                          {/*<Row type="flex">
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
                          </Row>*/}
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
