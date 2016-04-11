import React, { Component } from 'react'
import ReactDOM   from 'react-dom'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import '../../../css/guidePage.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Steps } from 'antd'
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import Base from './base'
import BootScreen from '../clientManagement/bootScreen'
import Guide from '../clientManagement/guide'
import AllStyle from '../clientManagement/allStyle'
import ClientManagementMenu from '../clientManagement/clientManagementMenu'
import PackProgress from '../clientManagement/base/packProgress'

import CONFIG from '../../config/API'

const steps = [{
  title: '应用信息'
}, {
  title: '开机画面',
}, {
  title: '引导图组',
}, {
  title: '总体风格',
}, {
  title: '导航配置',
}, {
  title: '生成APP',
}].map((s, i) => <Step key={i} title={s.title}  />);

let GuidePage = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      data : { app : {step : -1}}
    }
  },
  next() {

    let data = this.state.data;
    data.app.step++;
    console
    if (data.app.step >= steps.length) {
      data.app.step = steps.length;
    }
    this.setState({
      data
    });

  },
  render() {
    console.log(this.state.data.app.step);
    let step = this.state.data.app.step;
    return (
      <div className="appcenter mt_30">
        <div className="guidePage">
          <Steps current={step == -1 ? 0 : step-1}>{steps}</Steps>
          {step != '-1' ?(function (obj) {
            if (step == '1'){
              return <Base/>
            }
            else if( step == '2' ){
              return <BootScreen/>
            }else if( step == '3'){
              return <Guide/>
            }else if( step == '4'){
              return <AllStyle/>
            }else if( step == '5'){
              return <ClientManagementMenu/>
            }else if( step == '6'){
              return <div id="packProgressWrap">
                        <p className="packProgressTitle">正在生成您的APP,预计需要几分钟时间</p>
                        <PackProgress/>
                      </div>
            }
          })(this) : ''}

           <Button type="primary" size="large" style={{'height':88,'width':260,'fontSize':'22px','margin':'20px auto','borderRadius':'6px','display':'block'}}  onClick={this.next}> 
              继续
              <Icon type="right" />
            </Button>

        </div>
      </div>
    );
    
  },
  componentDidMount() {

    $.get(CONFIG.HOSTNAME+'/home',function(ajaxdata){
            let data = this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              data = ajaxdata.data;
              this.setState({
                data
              })
            }
      }.bind(this));
   
  }
});

export default  GuidePage;
