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
      current: 'index',
      upload : {
                  ios : '点击下载',
                  android : '点击下载'
              }
    };
  },
  Onmousedown(name){
      let upload = this.state.upload;
      upload[name] = this.props.app.version;
      this.setState({
          upload
      })

  },
  onMouseOver(name){
      let upload = this.state.upload;
      upload[name] = this.props.app.version;
      this.setState({
          upload
      })

  },
  onMouseOut(name){
      let upload = this.state.upload;
      upload[name] = '点击下载';
      this.setState({
          upload
      })
  },
  render() {
    let propsData = this.props.app;
    let domain  = this.props.config.DONAME + '';
    let created_at = propsData.created_at.substring(0,19).replace(/-/g,'/');
        created_at = new Date(created_at);
        created_at = created_at.format('yyyy-MM-dd');

    return (
        <div id="mainleft">
          <section className="ml_headlines mt_30">
            <h2 className="t_center">{propsData.name}</h2>
            <img src={domain + propsData.icon} title={propsData.name} />
            <p>上线时间:<span title={propsData.created_at}>{created_at}</span></p>
            <p>下线时间:<span></span></p>
          </section>
          <section className="mt_20 ml_scanInstall">
            <h3>扫描安装</h3>
            <img src={domain + propsData.qr_code} title={propsData.name}/>
          </section>
          <section className="mt_20 ml_download">
              <h3>下载</h3>
              <a href={this.props.download.ios} target="_blank" onMouseOver={this.onMouseOver.bind(this,'ios')} onMouseOut={this.onMouseOut.bind(this,'ios')}>
                <Button type="ghost" size="large" className='appbtn1'>
                  <Icon type="apple" />
                   {this.state.upload.ios}
                </Button>
              </a>
              <a href={this.props.download.android} target="_blank" onMouseOver={this.onMouseOver.bind(this,'android')} onMouseOut={this.onMouseOut.bind(this,'android')}>
                <Button type="ghost" size="large" className='appbtn1 mt_10'>
                  <Icon type="android" />
                  {this.state.upload.android}
                </Button>
              </a>
          </section>
        </div>
    );
  }

});

export default  IndexLeft;
