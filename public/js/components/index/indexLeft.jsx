import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import {Icon,Button} from 'antd';

const IndexLeft = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  render() {
    return (
        <div id="mainleft">
          <section className="ml_headlines mt_30">
            <h2 className="t_center">新媒体头条</h2>
            <img src="images/ml_headlines.png" title="新媒体头条"/>
            <p>上线时间:<span>2015-1-29</span></p>
            <p>下线时间:<span>None</span></p>
          </section>
          <section className="mt_20 ml_scanInstall">
            <h3>扫描安装</h3>
            <img src="images/ml_download.png" title="新媒体头条"/>
          </section>
          <section className="mt_20 ml_download">
              <h3>下载</h3>
              <Button type="ghost" size="large" className='appbtn1'>
                <Icon type="apple" />
                 V1.01
              </Button>
              <Button type="ghost" size="large" className='appbtn1 mt_10'>
                  <Icon type="android" />
                点击下载
              </Button>
          </section>
        </div>
    );
  }

});

export default  IndexLeft;
