import React, { Component } from 'react'
import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import '../../../css/statistics.less'
import { Row, Col,Radio,Menu, Icon , Button ,DatePicker,Table} from 'antd'
import MainNav from '../../components/mainNav'
import StatisticsLeftNav from '../../components/statisticsLeftNav'
import ActivationVolume from '../../components/index/activationVolume'
import CONFIG from '../../config/API'
import echarts from 'echarts/echarts';
import 'echarts/chart/line';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
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

let option = [];

const Statistics = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      tableData : [],
      data: {
          "statistics": {
              "activation": 0,
              "activation_today": 0,
              "active_today": 0,
              "hit_today": 0
          }
      },
      pagination : {current : 1,showQuickJumper : true},
      chartData : [],
      chartStatus : false,//图表上按钮点击时是否更新数据
      paginationStatus : false,//分页点击时是否更新数据
      postData : { tag : 'week',month:'',page:'',perPage:''},//请求参数
      index : 0
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
  chartChange(e) {
      this.tagChange({type:'tag',val:e.target.value},{tag:this.state.postData.tag},{page:1,perPage:7,tag:this.state.postData.tag});
  },
  tagChange(data,chartSubData,listSubData){//图表上方标签切换调用函数
    let postData = this.state.postData;

    //切换提交数据的tag类型
    if(data.type == 'month'){
      postData.month = data.val;
      postData.tag = 'month';
    }else if(data.type == 'tag'){
      postData.month = '';
      postData.tag = data.val;
    }
    
    this.setState({
      postData
    })

    setTimeout(function(){
      //图表数据
      this.ajaxfun('/statistics/index',chartSubData);
      //请求详细表格数据
      this.ajaxfun('/statistics/list',listSubData);
    }.bind(this), 300)
  },
  disabledDate(current) {
    // can not select days after today
    return current && current.getTime() > Date.now();
  },
  dataChange(data){  
    let month = data.format('yyyy-MM');
    console.log('From: ', month);
    this.tagChange({type:'month',val:month},{month},{month});
  },
  handleTableChange(pagination, filters, sorter) {//表格分页切换时
    const pager = this.state.pagination;
    pager.current = parseInt(pagination.current);
    this.setState({
      paginationStatus : true,
      pagination: pager
    });
    this.ajaxfun('/statistics/list',{page:pager.current,perPage:7,tag:this.state.postData.tag});
  },
  ajaxfun(url,parameter,callback){//ajax请求
    this.setState({
      loading: true
    });
    let data = parameter || {};
    data.tenantid = tenantid[0];

    $.get(CONFIG.HOSTNAME+url,data,function(ajaxdata){
        ajaxdata = JSON.parse(ajaxdata);
        let tableData = {
            key: '',
            day: '',
            startup:'',
            hit: '',
            activation:''
        }
        let data = [];
        if(ajaxdata.state){

          let ajaxdataCon = ajaxdata.data.meta || ajaxdata.data;

          ajaxdataCon.forEach(function(key,i){
            let  tableData = {};
            tableData.key = i;
            tableData.day = key.day;
            tableData.startup = key.startup;
            tableData.hit = key.hit;
            tableData.activation = key.activation;
            data.push(tableData);
          });

          let page = ajaxdata.data.paging;
          let pagination,chartData=this.state.chartData,tableData=this.state.tableData;
          let  chartStatus = false;
          let paginationStatus = false;

          if(page){
            pagination = {
              current : parseInt(page.currentPage),
              pageSize : parseInt(page.perPage),
              total : parseInt(page.total)
            } 
            tableData = data;
            paginationStatus = true;
          }else{
            pagination = this.state.pagination;
            chartData = data;
            chartStatus = true;
          }
          
          this.setState({
            tableData,
            chartData,
            chartStatus,
            pagination,
            paginationStatus,
            loading: false
          })
        
      }
    }.bind(this));
  },
  shouldComponentUpdate(nextProps, nextState){
    return nextState.chartStatus || nextState.paginationStatus;
  },
  render(){
      var name = this.props.params ? this.props.params.name : '';
      const columns = [{
                          title: '时间',
                          dataIndex: 'day'
                        }, {
                          title: '激活量',
                          dataIndex: 'activation'
                        }, {
                          title: '活跃数',
                          dataIndex: 'startup'
                        }, {
                          title: '点击量',
                          dataIndex: 'hit'
                        }];

      let optionList = {
              legend:[],
              activation : [],
              day : [],
              hit : [],
              startup : [],
          };

      this.state.chartData.forEach(function(key,i){
        optionList.activation.push(key.activation);
        optionList.day.push(key.day);
        optionList.hit.push(key.hit);
        optionList.startup.push(key.startup);
      });

      //图标配置项
       option = {
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
                        data:['激活量','活跃数','点击数']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : optionList.day
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
                            data:optionList.activation,
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
                            data:optionList.startup,
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
                            data:optionList.hit,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]
                };
    let data = this.state.tableData;
      return (
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                <StatisticsLeftNav cur={name}/>
            </Col>
            <Col span="20">
                <div id="mainCon">
                    <ActivationVolume {...this.state.data.statistics} config={CONFIG}></ActivationVolume>

                    <div className="block_header" id="chartsTab">
                      <Row>
                        <Col span="1" style={{width:'50px'}}>
                          时间
                        </Col>
                        <Col span="4">
                          <RadioGroup onChange={this.chartChange} value={this.state.postData.tag} size="large" style={{height:'50px'}}>
                            <RadioButton value="week">周</RadioButton>
                            <RadioButton value="month">月</RadioButton>
                            <RadioButton value="year">年</RadioButton>
                          </RadioGroup>
                        </Col>
                        <Col span="8">
                          <MonthPicker style={{ width: 184 }} onChange={this.dataChange}  value={this.state.postData.month} disabledDate={this.disabledDate}/>
                        </Col>
                      </Row>
                    </div>

                    <div id={"charts_"+this.state.index}  style={{width:1130,height:600,marginLeft:-50,marginTop:20}}></div>

                    <div className="detailedData">
                        详细数据
                    </div>
                    <div style={{backgroundColor:'#fff'}}>
                      <Table columns={columns} dataSource={data} pagination={this.state.pagination} onChange={this.handleTableChange}  loading={this.state.loading} className="mt_20"/>
                    </div>
                </div>
            </Col>
          </Row>
        </div>
      )
  },
  componentDidUpdate(){
    if(this.state.chartStatus){
      // 基于准备好的dom，初始化echarts实例
      let echartsId = 'charts_'+this.state.index;
      var myChart = echarts.init(document.getElementById(echartsId));
      // 绘制图表
      myChart.setOption(option); 
      this.setState({
        loading: false,
        chartStatus : false,
        index : ++this.state.index
      });
    }else if(this.state.paginationStatus){
      this.setState({
        loading: false,
        paginationStatus : false
      });
    }
      
  },
  componentDidMount(){
      let url = location.href.split('//')[1].split('.');
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
      //图表数据
      this.ajaxfun('/statistics/index',{tag:this.state.postData.tag});
      //请求详细表格数据
      this.ajaxfun('/statistics/list',{page:1,perPage:7,tag:this.state.postData.tag});
  }
})

export default  Statistics;