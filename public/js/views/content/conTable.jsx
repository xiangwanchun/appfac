import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/content.less'
import {Table,Button, Row, Col, Icon,DatePicker,Select,Input,Modal} from 'antd';
import classNames from 'classnames';
import Setting from './setting';
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
const columns = [{
  title: '位置',
  dataIndex: 'location',
  key: 'location',
  render(text,record){
    return <div className="pushContent"><p className="pushContentTitle">{record.location}</p></div>;
  }
}, {
  title: '引导图',
  dataIndex: 'guide',
  key: 'guide',
  render(text,record) {
    return <div className="guideImg"><img src={text}/></div>;
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
, {
  title: '内容分类',
  dataIndex: 'classification',
  key: 'classification',
  render(text,record) {
    return <div className="pushContent"><p className="">{record.classification}</p></div>;
  }
}
, {
  title: '点击数',
  dataIndex: 'clicks',
  key: 'clicks',
  render(text,record) {
    return <div className="pushContent"><p className="">{record.clicks}</p></div>;
  }
}
, {
  title: '评论数',
  dataIndex: 'comments',
  key: 'comments',
  render(text,record) {
    return <div className="pushContent"><p className="">{record.comments}</p></div>;
  }
}
, {
  title: '发布时间',
  dataIndex: 'releaseTime',
  key: 'releaseTime',
  render(text,record) {
    return <div className="pushContent"><p className="">{record.releaseTime}</p></div>;
  }
}
, {
  title: '置顶',
  dataIndex: 'stick',
  key: 'stick',
  render(text,record) {
    return <div className="pushContent"><p className="">{record.stick}</p></div>;
  }
}
,{
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


let ConTable = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
      ModalText: '对话框的内容',
      visible: false
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
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    this.setState({
      ModalText: '对话框将在两秒后关闭',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  },
  handleCancel() {
    console.log('点击了取消');
    this.setState({
      visible: false
    });
  },

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="contentBlocks mt_30">
        <Row style={{ marginTop: 24,width:940}} type="flex" justify="start" >
          <Col span="7" className="mr_10">
            <InputGroup className={searchCls} style={{width:220}}>
              <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
                onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} />
              <div className="ant-input-group-wrap">
                <Button className={btnCls} onClick={this.handleSearch}>
                  <Icon type="search" />
                </Button>
              </div>
            </InputGroup>
          </Col>
          <Col span="8" className="mr_10">
            <Row>
              <Col span="5" >
                  <label style={{lineHeight:'35px'}}>发表时间:</label>
              </Col>
              <Col span="19">
                  <RangePicker style={{ width:235}} onChange={this.dataOnChange} />
              </Col>
            </Row>
          </Col>
          <Col span="4">
            <Row>
              <Col span="6">
                  <label style={{lineHeight:'35px'}}>排序: </label>
              </Col>
              <Col span="18">
                  <Select defaultValue="lucy" style={{ width: 100 }} onChange={this.handleChange} size="large">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="yiminghe">yiminghe</Option>
                  </Select>
              </Col>
            </Row>
            
          </Col>
          <Col span="4">
            <div className="contentSetting">
              <a onClick={this.showModal}>
                <Icon type="setting" />
              </a>
              <Modal title="设置"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                >
                <div><Setting/></div>
              </Modal>
            </div>
          </Col>
        </Row>
          <Table columns={columns} dataSource={data} className="mt_20"/>
      </div>

    );
  }
});

export default  ConTable;

