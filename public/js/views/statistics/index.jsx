import React, { Component } from 'react'
import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Row, Col} from 'antd'
import { Menu, Icon , Button } from 'antd'
import MainNav from '../../components/mainNav'
import StatisticsLeftNav from '../../components/statisticsLeftNav'
import Push from './push'
import Notice from './notice'
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
import Feedback from './feedback'
import UserGrowth from './UserGrowth'
import ActivationVolume from '../../components/index/activationVolume'
import CONFIG from '../../config/API'
import echarts from 'echarts/echarts';
import 'echarts/chart/line';
// etc.
var option = {
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        dataZoom : {
            show : true,
            realtime : true,
            start : 0,
            end : 100
        },
        xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : ['周一','周二','周三','周四','周五','周六','周日']
                  }
              ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
              type:'line',
              stack: '总量',
              symbol: 'emptyCircle',
              itemStyle: {
                  normal: {
                      color:'#00B233',
                      areaStyle: {type: 'default',color:'#FF6E5D'},
                      lineStyle: {color:'#00B233'}
                  }
              },
              data:[120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };
const Statistics = React.createClass({
  getInitialState() {
    return {
      current: 'base',
       data: {
          "statistics": {
              "activation": '',
              "activation_today": '',
              "active_today": '',
              "hit_today": ''
          }
      }
    }
  },
   GetRequest() {
    var url = location.href.split('?')[1].split('#')[0]; //获取url中"?"符后"#"前的字串 
    var theRequest = new Object();
    var str = url;
    var strs;
    console.log(str);
    if (str.indexOf("&") != -1) {
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    } else {
        theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
    }
    return theRequest;
  },
   render(){
      var name = this.props.params ? this.props.params.name : '';
      return (
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                <StatisticsLeftNav cur={name}/>
            </Col>
            <Col span="20">
                <div id="mainCon">
                    <ActivationVolume {...this.state.data.statistics} config={CONFIG}></ActivationVolume>
                    <div id="demo"  style={{width:1000,height:600}}></div>
                </div>
            </Col>
          </Row>
        </div>
      )
  },
  componentDidMount(){
      let url = location.href.split('//')[1].split('.');
      console.log(url);
      var urlparam = this.GetRequest();
      urlparam.tenant_id= 'test' || url[0];     
      $.get(CONFIG.HOSTNAME, urlparam,function(ajaxdata){
            let data = this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              data = ajaxdata.data;
              this.setState({
                data
              })
            }
      }.bind(this));
      $(function(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('demo'));
        // 绘制图表
        myChart.setOption(option);
      })

      
      
  }
})

export default  Statistics;