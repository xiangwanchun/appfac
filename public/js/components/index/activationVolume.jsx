import React, { Component } from 'react'
import 'antd/style/index.less'
import '../css/base.less'
import '../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon } from 'antd';

const ActivationVolume = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  handleClick(e) {
   
  },
  render() {
    return (
      <div className="contentBlocks">
  
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                
            </Col>
            <Col span="20">
                <div id="mainCon">

                </div>
            </Col>
          </Row>
        </div>
      </div>
      
    );
  }

});

export default  App;
