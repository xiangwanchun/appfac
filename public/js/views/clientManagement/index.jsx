import React, { Component } from 'react'
import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Row, Col} from 'antd'
import { Menu, Icon , Button } from 'antd'
import MainNav from '../../components/mainNav'
import LeftNav from '../../components/leftNav'
import VersionHistory from './VersionHistory'
import About from './about'
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
import Index from './index'
import Base from './base'
import Style from './style'
import ClientManagementMenu from './clientManagementMenu';

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
                    {(function (obj) {
                      var name = obj.props.params ? obj.props.params.name : '';
                        if (name == 'about'){
                          return <About/>
                        }
                        else if( name == 'version' ){
                          return <VersionHistory/>
                        }else if( name == 'base'){
                            return <Base/>
                        }else if( name == 'style'){
                            return <Style/>
                        }else if( name == 'menu'){
                            return <ClientManagementMenu/>
                        }else{
                          return <Base/>
                        }
                    })(this)}
                </div>
            </Col>
          </Row>
        </div>
      )
  }
})

export default  clientManagement;