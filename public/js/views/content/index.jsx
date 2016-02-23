import React, { Component } from 'react'
import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Row, Col,Menu, Icon , Button } from 'antd'
import MainNav from '../../components/mainNav'
import ContentLeftNav from '../../components/contentLeftNav'
import ConTable from './conTable'
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'// etc.
const Content = React.createClass({
   render(){
      var name = this.props.params ? this.props.params.name : '';
      return (
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                <ContentLeftNav/>
            </Col>
            <Col span="20">
                <div id="mainCon">
                    {(function (obj) {
                      
                        if( name == 'notice' ){
                          
                        }else if( name == 'feedback'){
                           
                        }else{
                          return <ConTable/>
                        }
                    })(this)}
                </div>
            </Col>
          </Row>
        </div>
      )
  }
})

export default  Content;