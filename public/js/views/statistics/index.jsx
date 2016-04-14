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
/*var option = {
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
    };*/

    var myDate = new Date(); //获取今天日期
      myDate.setDate(myDate.getDate() - 6);
      var dateArray = []; 
      var dateTemp; 
      var flag = 1; 
      for (var i = 0; i < 7; i++) {
          dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
          dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
      }


    var option = {
    title : {
        text: '',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis'
    },
    markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
    legend: {
        data:['本周激活量','本周活跃数','本周点击数']
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : dateArray
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            }
        }
    ],
    series : [
        {
            name:'激活量',
            type:'line',
            data:[10, 16, 5, 3, 20, 17, 23],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
        },
        {
            name:'活跃数',
            type:'line',
            data:[55, 80, 63, 59, 62, 51, 71],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
        },
        {
            name:'点击数',
            type:'line',
            data:[106, 167, 102, 111, 256, 301, 469],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
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
                    <div id="demo"  style={{width:1130,height:600,marginLeft:-50,marginTop:20}}></div>
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
      urlparam.tenant_id = url[0];     
      $.get(CONFIG.HOSTNAME+'/home', urlparam,function(ajaxdata){
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