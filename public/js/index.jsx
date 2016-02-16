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

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

const Index = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  handleClick(e) {
   
  },
  render() {
    return (
      <div>
        <div className="appcenter mt_30">
          <Row>
            <Col span="5">
                <IndexLeft></IndexLeft>
            </Col>
            <Col span="19">
                <div id="mainCon">
                    <UpdataTip></UpdataTip>
                    <ActivationVolume></ActivationVolume>
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
