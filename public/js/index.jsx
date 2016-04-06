import React, { Component } from 'react'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/index.less'
import { Menu, Icon,Button,Modal, Row, Col} from 'antd'
import MainNav from './components/mainNav'
import ActivationVolume from './components/index/activationVolume'
import UpdataTip from './components/index/updataTip'
import IndexLeft from './components/index/indexLeft'
import QuickEntry from './components/index/QuickEntry'
import GuidePage from './views/guidePage/index'
import CONFIG from './config/API'

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

const Index = React.createClass({

  getInitialState() {
    return {
      current: 'index',
      UpdataTip : '',
      states: '',
      data: {
          "app": {
              "created_at": "1991-10-13 06:33:53",
              "icon": "",
              "name": "",
              "qr_code": ""
          },
          "statistics": {
              "activation": '',
              "activation_today": '',
              "active_today": '',
              "hit_today": ''
          },
          "download" : {
              "ios" : "",
              "android" : ""
          }

      }
    }
  },
  handleClick(e) {
   
  },
  componentDidMount(){
      let url = location.href.split('//')[1].split('.');
      var urlparam = this.GetRequest();
      urlparam.tenant_id= url[0];     
      $.get(CONFIG.HOSTNAME+'/home', urlparam,function(ajaxdata){
            let data = this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              data = ajaxdata.data;
              this.setState({
                data
              })
            }
      }.bind(this));
      
  },//获取url中get参数的值
 GetRequest() {
    var url = location.href.split('?')[1].split('#')[0]; //获取url中"?"符后"#"前的字串 
    var theRequest = new Object();
    var str = url;
    var strs;
    console.log(str);
    if (str.indexOf("&") != -1) {
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    } else {
        theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
    }
    return theRequest;
  },
  render() {
      return (
          <div className="appcenter mt_30">
            <GuidePage></GuidePage> 
          </div>
        )
              
     
  }

});

export default  Index;



 /*return (
        <div>
          <div className="appcenter mt_30">
            <Row>
              <Col span="5">
                  <IndexLeft {...this.state.data} config={CONFIG}></IndexLeft>
              </Col>
              <Col span="19">
                  <div id="mainCon">
                      <UpdataTip></UpdataTip>
                      <ActivationVolume {...this.state.data.statistics} config={CONFIG}></ActivationVolume>
                      <QuickEntry></QuickEntry>   
                  </div>
              </Col>
            </Row>
          </div>
        </div>
      );*/
