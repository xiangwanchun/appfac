import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'
import {Table,Button, Row, Col, Icon,DatePicker,Select} from 'antd';
const RangePicker = DatePicker.RangePicker;
const columns = [{
  title: '推送内容',
  dataIndex: 'name',
  key: 'name',
  render(text,record) {
    return <div className="pushContent"><p className="pushContentTitle">{record.title}</p><p className="pushContentCon">{record.content}</p></div>;
  }
}, {
  title: '创建时间',
  dataIndex: 'time',
  key: 'time',
  render(text,record) {
    console.log(record.a1);
    var bb = text[0];
    return <div className="pushContent"><p className="">{record.time}</p><p className="">{record.platform}</p></div>;
  }
},{
  title: '操作',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <a href="javascript:;">删除</a>
      </span>
    );
  }
}];

const data = [{
  key: '1',
  title: '憧憬',
  content:'憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈憧憬哈哈哈',
  time: '2016-2-22 14:20:06',
  platform:'所有用户',
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  title: '胡彦祖',
  content:'憧憬哈哈哈',
  time: '2016-2-22 14:20:06',
  platform:'IOS',
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  title: '李大嘴',
  content:'憧憬哈哈哈',
  time: '2016-2-22 14:20:06',
  platform:'Android',
  address: '西湖区湖底公园1号'
}];


let Feedback = React.createClass({

  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  handleUpload(){
    console.log('111111');
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
    return (
      <div className="contentBlocks mt_30">
        <Row style={{ marginTop: 24 }}>
          <Col span="6">
            <RangePicker style={{ width:220}} onChange={this.dataOnChange} />
          </Col>
          <Col span="3">
            <Select defaultValue="lucy" style={{ width: 100 }} onChange={this.handleChange} size="large">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span="3">
            <Select defaultValue="lucy" style={{ width: 100 }} onChange={this.handleChange} size="large">
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

export default  Feedback;

