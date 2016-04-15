import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'
import {Table,Button, Row, Col, Icon,Modal} from 'antd';
import CONFIG from '../../config/API'

let PushRecord = React.createClass({
  getInitialState() {
    return {
      data: [{
              key: '',
              title: '',
              content:'',
              time: '',
              platform:'',
              address: ''
            }]
    }
  },
  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  handleUpload(){
    console.log('111111');
  },
  normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
  },
  delPushRecord(record){
    $.post(CONFIG.HOSTNAME+'/push/'+record.key+'/cancel',{'tenantid':tenantid[0]},function(ajaxdata){
        ajaxdata = JSON.parse(ajaxdata);
        if(ajaxdata.state){
            Modal.success({
              title: '成功信息',
              content: `推送撤销成功!`
            });
          }else{
            Modal.error({
              title: '失败消息',
              content: `推送撤销失败!`
            });
          } 
      }.bind(this));
  },
  editorPush(){

  },
  againPush(record){
    $.post(CONFIG.HOSTNAME+'/push/'+record.key+'/again',{'tenantid':tenantid[0]},function(ajaxdata){
        ajaxdata = JSON.parse(ajaxdata);
        if(ajaxdata.state){
            Modal.success({
              title: '成功信息',
              content: `推送重发成功!`
            });
          }else{
            Modal.error({
              title: '失败消息',
              content: `推送重发失败!`
            });
          } 
      }.bind(this));
  },
  render() {
    let _this = this;
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
                  return <div className="pushContent"><p className="">{record.time}</p><p className="">{record.platform}</p></div>;
                }
              },
              {
                title: '状态',
                key: 'status',
                render(text,record){
                  console.log('1111111');
                  console.log(record);
                  if(record.data){
      
                    if(record.data.timing ==2){
                        return  <div className="pushContent">
                                  <p className="pushContentCon">定时推送将于:</p>
                                  <p className="pushContentCon">{record.data.time}</p>
                                  <p className="pushContentCon">推送</p>
                                </div>;
                    }else if(record.data.status == 2){
                        return  <div className="pushContent">
                                  <p className="pushContentCon">IOS推送成功</p>
                                  <p className="pushContentCon">Android推送失败</p>
                                </div>;
                    }else if(record.data.status == 3){
                        return  <div className="pushContent">
                                  <p className="pushContentCon">IOS推送失败</p>
                                  <p className="pushContentCon">Android推送成功</p>
                                </div>;
                    }else if(record.data.status == 4){
                        return  <div className="pushContent">
                                  <p className="pushContentCon">IOS推送失败</p>
                                  <p className="pushContentCon">Android推送失败</p>
                                </div>;
                    }else if(record.data.status == 1){
                        return  <div className="pushContent">
                                  <p className="pushContentCon">已经送达</p>
                                </div>;
                    }else{
                      return <span></span>
                    }

                  }else{
                    return <span></span>
                  }

                }

              },
              {
                title: '操作',
                key: 'operation',
                render(text, record) {
                  let {state,againPushState,successState} = 'none' ;
                  if(record.data){
                    state = record.data.timing ==2 ? 'inline' : 'none';
                    againPushState = record.data.status !=1 ? 'inline' : 'none';
                  }else{
                    return <span></span>
                  }                  
                  return (
                    <span>
                      <a href="javascript:;" onClick={_this.delPushRecord.bind(_this,record)} style={{'display':state}}>撤销</a>
                      <span className="ant-divider" style={{'display':state}}></span>
                      <a href="javascript:;" onClick={_this.editorPush.bind(_this,record)} style={{'display':state}}>编辑</a>
                      <span className="ant-divider" style={{'display':state}}></span>
                      <a href="javascript:;" onClick={_this.againPush.bind(_this,record)} style={{'display':againPushState}}>重推</a>
                    </span>
                  );
                }
              }];
    return (
      <div className="mt_30">
          <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  },
  componentDidMount(){
    $.get(CONFIG.HOSTNAME+'/push',{'tenantid':tenantid[0]},function(ajaxdata){
          ajaxdata = JSON.parse(ajaxdata);
          console.log(ajaxdata);
          var tableData = {
              key: '',
              title: '',
              content:'',
              time: '',
              platform:''
          }
          var data = [];
          if(ajaxdata.state){
              var ajaxdata = ajaxdata.data.data;
              ajaxdata.forEach(function(key,i){
                var  tableData = {};
                tableData.key = key.id ;
                tableData.title = key.title ;
                tableData.content = key.content ;
                tableData.time = key.created_at ;
                let platform = ['iOS','Android','全部'];
                tableData.platform = platform[key.destination-1] ;
                tableData.data = key;
                data.push(tableData);
              });
              this.setState({
                data
              })
          
        }
      }.bind(this));
  }
});

export default  PushRecord;



