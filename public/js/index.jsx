import React, { Component } from 'react'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button} from 'antd'
import MainNav from './components/mainNav'
import ActivationVolume from './components/index/activationVolume'
import UpdataTip from './components/index/updataTip'
import IndexLeft from './components/index/indexLeft'
import QuickEntry from './components/index/QuickEntry'
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
          }
      }


  }
  },
  handleClick(e) {
   
  },
  componentDidMount(){
     
      console.log(CONFIG.HOSTNAME);
      $.get(CONFIG.HOSTNAME, { token: "fds", uid: 1 ,username:32 },function(ajaxdata){
            let data = this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              data = ajaxdata.data;
              this.setState({
                data
              })
            }  
      }.bind(this));
     setTimeout(function(){
          console.log('2222222');
          console.log(this.state.data);
      }.bind(this), 1000)
      
  },
  render() {
    return (
      <div>
        <div className="appcenter mt_30">
          <Row>
            <Col span="5">
                <IndexLeft {...this.state.data.app} config={CONFIG}></IndexLeft>
            </Col>
            <Col span="19">
                <div id="mainCon">
                    {/*<UpdataTip></UpdataTip>*/}
                    <ActivationVolume {...this.state.data.statistics} config={CONFIG}></ActivationVolume>
                    <QuickEntry></QuickEntry>   
                </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

});

export default  Index;
