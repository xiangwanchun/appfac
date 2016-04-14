import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/content.less'
import {Table,Button, Row, Col, Icon,DatePicker,Select,Input,Modal,message} from 'antd';
import CONFIG from '../../config/API'
import classNames from 'classnames';
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
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
let PushConTable = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
      ModalText: '对话框的内容',
      visible: false,
      data: [],
      loading: false,
      pagination : {current : 1,showQuickJumper : true},
      start_date : '',
      end_date : ''
    };
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = parseInt(pagination.current);
    this.setState({
      pagination: pager,
    });
    this.ajaxfun('/push/content',{page:pagination.current,perPage:5,title:this.state.value,start_date:this.state.start_date,end_date:this.state.end_date});
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {//搜索
      this.ajaxfun('/push/content',{page:1,perPage:5,title:this.state.value,start_date:this.state.start_date,end_date:this.state.end_date});
  },
  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  pushFun(record){//推送按钮触发函数
    this.props.fun(record);
  },
  handleChange(val){
    console.log(val);
  },
  dataOnChange(value) {

    this.setState({
      start_date:value[0].format('yyyy-MM-dd'),
      end_date:value[1].format('yyyy-MM-dd')
    });

    this.ajaxfun('/push/content',{page:1,perPage:5,title:this.state.value,start_date:value[0].format('yyyy-MM-dd'),end_date:value[1].format('yyyy-MM-dd') });
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  ajaxfun(url,data){
    data.tenantid = tenantid[0];
    $.get(CONFIG.HOSTNAME+url,data,function(ajaxdata){
        ajaxdata = JSON.parse(ajaxdata);
        let tableData = {
            key: '',
            title: '',
            content:'',
            time: '',
            platform:''
        }
        let data = [];
        if(ajaxdata.state){
            let ajaxdataCon = ajaxdata.data.meta;
            ajaxdataCon.forEach(function(key,i){
              let  tableData = {};
              tableData.key = key.id;
              tableData.title = key.title;
              tableData.content = key.summary;
              tableData.time = key.publish_date;
              data.push(tableData);
            });
            let page = ajaxdata.data.paging;
            let pagination = {
                current : parseInt(page.currentPage),
                pageSize : 5,
                total : parseInt(page.total)
            }
            this.setState({
              data,
              pagination
            })
        
      }
    }.bind(this));
  },
  render() {
    let _this = this;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const columns = [
        {
          title: '文章标题',
          dataIndex: 'title',
          key: 'title',
          render(text,record) {
            return  <div className="pushContent"><p className="pushContentTitle">{record.title}</p><p className="pushContentCon">{record.content}</p></div>;
          }
        },
        {
          title: '发布时间',
          dataIndex: 'releaseTime',
          key: 'releaseTime',
          render(text,record) {
            return <div className="pushContent"><p className="">{record.releaseTime}</p></div>;
          }
        },{
          title: '操作',
          key: 'operation',
          render(text, record){
            return (
              <span>
                <a href="javascript:;" onClick={_this.pushFun.bind(_this,record)}>推送</a>
              </span>
            );
          }
        }];
    const data = this.state.data;
    return (
      <div>
        <Row style={{ marginTop: 24,width:850}} type="flex" justify="start" >
          <Col span="8" className="mr_10">
            <InputGroup className={searchCls} style={{width:200}}>
              <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
                onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} />
              <div className="ant-input-group-wrap">
                <Button className={btnCls} onClick={this.handleSearch}>
                  <Icon type="search" />
                </Button>
              </div>
            </InputGroup>
          </Col>
          <Col span="9" className="mr_10">
            <Row>
              <Col span="5" >
                  <label style={{lineHeight:'35px'}}>发表时间:</label>
              </Col>
              <Col span="19">
                  <RangePicker style={{ width:235}} onChange={this.dataOnChange} />
              </Col>
            </Row>
          </Col>
          <Col span="5">
              <Select defaultValue="lucy" style={{ width: 160 }} onChange={this.handleChange} size="large">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
          </Col>
        </Row>
          <Table columns={columns} dataSource={data} pagination={this.state.pagination} onChange={this.handleTableChange} className="mt_20"/>
      </div>

    );
  },
  componentDidMount(){
    this.ajaxfun('/push/content',{page:1,perPage:5});
  }
});

export default  PushConTable;

