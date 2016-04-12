import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/content.less'
import {Table,Button, Row, Col, Icon,DatePicker,Select,Input,Modal} from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
let PushConTable = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
      ModalText: '对话框的内容',
      visible: false,
      data: [],
      pagination: {},
      loading: false,
    };
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
  handleSearch() {
    alert(this.state.value);
    if (this.props.onSearch){
      this.props.onSearch();
    }
  },
  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  pushFun(record){
    console.log(record.key);
  },
  handleChange(val){
    console.log(val);
  },
  dataOnChange(value) {
    console.log('From: ', value[0], ', to: ', value[1]);
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
          title: '发布时间',
          dataIndex: 'releaseTime',
          key: 'releaseTime',
          render(text,record) {
            return <div className="pushContent"><p className="">{record.releaseTime}</p></div>;
          }
        }
        , {
          title: '文章标题',
          dataIndex: 'title',
          key: 'title',
          render(text,record) {
            return <div className="pushContent"><p className="">{record.title}</p></div>;
          }
        }
        ,{
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

    const data = [{
      key: '1',
      title: '憧憬',
      content:'憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈',
      location:'banner',
      guide:'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=2014901334,2545168879&fm=96&s=7FC6489EC54A7EEF5A7194FA0300103D',
      classification:'分类1',
      clicks:'9999',
      comments:'666',
      releaseTime:"2016-2-23 14:06:06",
      stick:'永久'

    }, {
      key: '2',
      title: '憧憬',
      content:'憧憬哈哈',
      location:'banner',
      guide:'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=2014901334,2545168879&fm=96&s=7FC6489EC54A7EEF5A7194FA0300103D',
      classification:'分类1',
      clicks:'9999',
      comments:'666',
      releaseTime:"2016-2-23 14:06:06",
      stick:'永久'
    }, {
      key: '3',
      title: '憧憬',
      content:'憧憬哈哈哈憧憬哈哈哈憧',
      location:'banner',
      guide:'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=2014901334,2545168879&fm=96&s=7FC6489EC54A7EEF5A7194FA0300103D',
      classification:'分类1',
      clicks:'9999',
      comments:'666',
      releaseTime:"2016-2-23 14:06:06",
      stick:'永久'
    }];
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
          <Table columns={columns} dataSource={data} className="mt_20"/>
      </div>

    );
  }
});

export default  PushConTable;

