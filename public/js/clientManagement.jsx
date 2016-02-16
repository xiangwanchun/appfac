import React, { Component } from 'react'
import { render } from 'react-dom'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/clientManagement.less'
import { Row, Col} from 'antd'
import { Menu, Icon , Button } from 'antd'
import MainNav from './components/mainNav'
import LeftNav from './components/leftNav'
import VersionHistory from './views/clientManagement/VersionHistory'
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
import Index from './index';

// etc.
const clientManagement = React.createClass({
   render(){
      return (
        <div className="appcenter mt_30">
          <Row>
            <Col span="5">
                <LeftNav/>
            </Col>
            <Col span="19">
                <div id="mainCon">
                    <VersionHistory/>
                </div>
            </Col>
          </Row>
        </div>
      )
  }
})

export default  clientManagement;
