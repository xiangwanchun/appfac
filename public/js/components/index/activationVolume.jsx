import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon } from 'antd';

const ActivationVolume = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  render() {
    let propsData = this.props;
    return (
      <div className="ActivationVolume mt_30">
          <Row>
            <Col span="6">
                <div className="AVInner">
                	<h4>今日激活量</h4>
                	<p className="AVnum">{propsData.activation_today}</p>
                	<p className="AVgrowth"><i className="iconfont icon-xiangshang"></i>{propsData.activation_today}</p>
                </div>
            </Col>
            <Col span="6">
                <div className="AVInner">
                	<h4>今日活跃数</h4>
                	<p className="AVnum">{propsData.startup_today}</p>
                	<p className="AVgrowth"><i className="iconfont icon-xiangshang"></i>{propsData.startup_difference}</p>
                </div>
            </Col>
            <Col span="6">
                <div className="AVInner">
                	<h4>今日点击数</h4>
                	<p className="AVnum">{propsData.hit_today}</p>
                	<p className="AVgrowth"><i className="iconfont icon-xiangshang"></i>{propsData.hit_difference}</p>
                </div>
            </Col>
            <Col span="6">
                <div>
                	<h4>总激活量</h4>
                	<p className="AVnum">{propsData.activation_all}</p>
                	<p className="AVgrowth"><i className="iconfont icon-xiangshang"></i>{propsData.activation_all_difference}</p>
                </div>
            </Col>
          </Row>
      </div>
    );
  }

});

export default  ActivationVolume;
