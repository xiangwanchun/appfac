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


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const App = React.createClass({

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
        <MainNav></MainNav>
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                <IndexLeft></IndexLeft>
            </Col>
            <Col span="20">
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

export default  App;
