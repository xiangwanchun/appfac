import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import {Icon,Button} from 'antd';

Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}

const IndexLeft = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  render() {
    let propsData = this.props;
    let domain  = propsData.config.DONAME + '';
    let created_at = propsData.created_at.substring(0,19).replace(/-/g,'/');
        created_at = new Date(created_at);
        created_at = created_at.format('yyyy-MM-dd');

    return (
        <div id="mainleft">
          <section className="ml_headlines mt_30">
            <h2 className="t_center">新媒体头条</h2>
            <img src={domain + propsData.icon} title="新媒体头条"/>
            <p>上线时间:<span title={propsData.created_at}>{created_at}</span></p>
            <p>下线时间:<span title='none'>none</span></p>
          </section>
          <section className="mt_20 ml_scanInstall">
            <h3>扫描安装</h3>
            <img src={domain + propsData.qr_code} title="新媒体头条"/>
          </section>
          <section className="mt_20 ml_download">
              <h3>下载</h3>
              <a>
                <Button type="ghost" size="large" className='appbtn1'>
                  <Icon type="apple" />
                   V1.01
                </Button>
              </a>
              <a>
                <Button type="ghost" size="large" className='appbtn1 mt_10'>
                    <Icon type="android" />
                  点击下载
                </Button>
              </a>
          </section>
        </div>
    );
  }

});

export default  IndexLeft;
