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
const RangePicker = DatePicker.RangePicker;

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
              "activation": '',
              "activation_today": '',
              "active_today": '',
              "hit_today": ''
          }
      },
      pagination : {current : 1,showQuickJumper : true},
      chartData : [],
      status : false,
      postData : { tag : 'week',month:'',page:'',perPage:''},
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
  tagChange(e) {
    this.setState({
      tag:e.target.value
    })
    this.ajaxfun('/statistics/index',{tag:e.target.value});
  },
  dataChange(value){
     console.log('From: ', value[0], ', to: ', value[1]);
  },
  Change(value){

    /*this.setState({
      start_date:value[0].format('yyyy-MM-dd'),
      end_date:value[1].format('yyyy-MM-dd')
    });*/

    /*this.ajaxfun('/push/content',{page:1,perPage:5,title:this.state.value,start_date:value[0].format('yyyy-MM-dd'),end_date:value[1].format('yyyy-MM-dd'),navigate_id:this.state.navigate_id});*/
  },
  handleTableChange(pagination, filters, sorter) {
    /*const pager = this.state.pagination;
    pager.current = parseInt(pagination.current);
    this.setState({
      pagination: pager,
    });*/
    /*this.ajaxfun('/push/content',{page:pagination.current,perPage:5,title:this.state.value,start_date:this.state.start_date,end_date:this.state.end_date,navigate_id:this.state.navigate_id});*/
  },
  ajaxfun(url,parameter,callback){
    this.setState({
      loading: true,
      status : false
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

          console.log('========================================');
          console.log(data);

          let page = ajaxdata.data.paging;
          let pagination,chartData=this.state.chartData,tableData=this.state.tableData;

          if(page){
            pagination = {
              current : parseInt(page.currentPage),
              pageSize : 5,
              total : parseInt(page.total)
            } 
            tableData = data;
          }else{
            pagination = this.state.pagination;
            chartData = data;
          }
          
          this.setState({
            tableData,
            chartData,
            pagination,
            status : true,
            loading: !this.state.loading
          })
        
      }
    }.bind(this));
  },
  render(){
      var name = this.props.params ? this.props.params.name : '';
      console.log(this.state.chartData);
      const columns = [{
                          title: '时间',
                          dataIndex: 'day'
                        }, {
                          title: '当日激活量',
                          dataIndex: 'activation'
                        }, {
                          title: '当日活跃数',
                          dataIndex: 'startup'
                        }, {
                          title: '当日点击量',
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
                        data:['本周激活量','本周活跃数','本周点击数']
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
    console.log('12222222222')
    console.log(data);
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
                          <RadioGroup onChange={this.tagChange} defaultValue="week" size="large" style={{height:'50px'}}>
                            <RadioButton value="week">周</RadioButton>
                            <RadioButton value="month">月</RadioButton>
                            <RadioButton value="year">年</RadioButton>
                          </RadioGroup>
                        </Col>
                        <Col span="8">
                          <RangePicker style={{ width: 184 }} onChange={this.dataChange} />
                        </Col>
                      </Row>
                    </div>

                    <div id="charts"  style={{width:1130,height:600,marginLeft:-50,marginTop:20}}></div>

                    <div className="detailedData">
                        详细数据
                    </div>
                    <Table columns={columns} dataSource={data} pagination={this.state.pagination} onChange={this.handleTableChange}  loading={this.state.loading} className="mt_20"/>
                </div>
            </Col>
          </Row>
        </div>
      )
  },
  componentDidUpdate(){
    console.log('=1')
    if(this.state.status){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('charts'));
      // 绘制图表
      myChart.setOption(option); 
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
      //请求详细表格数据
      this.ajaxfun('/statistics/index',{page:1,perPage:7,tag:this.state.postData.tag});
      this.ajaxfun('/statistics/list',{page:1,perPage:7,tag:this.state.postData.tag});
  }
})

export default  Statistics;