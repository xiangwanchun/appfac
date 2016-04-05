import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Switch,Carousel,Modal,message} from 'antd'
import CONFIG from '../../config/API'
import '../../plug/jquery.SuperSlide.2.1.1.js'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const Guide = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      slickGoTo:2,
      fileList :  [],
      status : true, //是否首次加载
      index : 0
    };
  },
  handSubmit(e) {

      let guide_img = this.state.fileList.map((file) => {
        let url = file.url.indexOf('com') != -1 ? file.url.split("com")[1] : file.url;
        return url;
      });

     $.post(CONFIG.HOSTNAME+'/client/guide',{'guide_img' : guide_img},function(ajaxdata){
      /*console.log(ajaxdata);*/
      let data = this.state.data;
      ajaxdata = JSON.parse(ajaxdata);
      if(ajaxdata.state){
          Modal.success({
            title: '成功信息',
            content: `恭喜您!引导图组设置成功。`
          });
      }else{
          Modal.error({
            title: '引导图组失败',
            content: `引导图组保存失败`
          });
      }  
  }.bind(this));
  },
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
    //上传变换的时候
  uploadChange(name,info){

/*    console.log(name + '===============');
    console.log(info);
    return;*/
    console.log('1=======================1');
    console.log(info);

      

      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){

        let fileList = info.fileList;
        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-4);
        console.log(22222);
        console.log(fileList);
        // 2. 读取远程路径并显示链接
        fileList = fileList.map((file) => {
          if (file.response && file.response.state) {
            // 组件会将 file.url 作为链接进行展示
            file.url = CONFIG.DONAME + file.response.data.src;
            return file;
          }else if(!file.response && file.status == "done"){
            return file;
          }
          return true;
        });
        console.log(fileList)

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
          if (file.response && file.response.state) {
            return file.response.state  == true;
          }
          return true;
        });


        if(info.file.response.state){

          message.success(`${info.file.name} 上传成功。`);
          console.log(fileList);
          this.setState({ fileList });

        }else{

          var errorsDes = info.file.response.error.description;
          Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} ${errorsDes}`
          });

        }    

      }else if (info.file.status === 'error') {

        Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} 上传失败。`
          });

      }

 
      
  },
  beforeChange(a,b){

  },
  render() {

    if(this.state.status && !this.state.fileList.length){
      return <div></div>
    }
    var _this = this;
    let guide1 = {
              action: '/factory/upload',
              name: 'file',
              showUploadList: false,
              multiple : true,
              onChange(info) {
                  _this.uploadChange('batch',info);              
              },
            };

     let guide2 = {
              action: '/factory/upload',
              listType: 'picture-card',
              name: 'file',
              onChange(info) {
                _this.uploadChange('single',info);              
              },
              defaultFileList: this.state.fileList
            };

      let CarouselCon = this.state.fileList.map((file) => {
        /*return <div className="CarouselList" key={file.uid} style={{backgroundImage:'url('+file.url+')'}}></div>;*/
        return <li key={file.uid}><a href="#" target="_blank"><img src={file.url} /></a></li>
      });

    let sliderId = "slideBox_"+this.state.index;

    return (


        <div className="mt_15">
        <div className="block_header">
          <span>引导图组</span>
        </div>
        <Row style={{height:580}}>
          <Col span="9">
            <div className="guide_l">
                  <div className="carouselWrap">

                    <div id={sliderId} className="slideBox">
                      <div className="hd">
                        <ul></ul>
                      </div>

                      <div className="bd">
                        <ul>
                          {CarouselCon}
                        </ul>
                      </div>
                      <a className="prev" href="javascript:void(0)"><Icon type="left"/></a>
                      <a className="next" href="javascript:void(0)"><Icon type="right"/></a>
                  </div>

              </div>
            </div>
          </Col>
          <Col span="15">
            <div className="guide_r mt_30">
                <Row>
                  <Col span="3">自定图组:</Col>
          {/*        <Col span="4" className="mr_10">
                    <Upload {...guide1} data={{"type" :'guide'}}>
                      <Button type="primary">
                         点击上传
                      </Button>
                    </Upload>
                  </Col>*/}
                  <Col span="14">图片要求:png格式,1024x1024建议2到5张</Col>
                  <Col span="21" offset="3">
                      <div className="guide_r_con mt_20">

                          <div className="clearfix">
                            <Upload {...guide2} data={{"type" :'guide'}}>
                              <Icon type="plus" />
                            </Upload>
                          </div>
                          
                      </div>
                  </Col>
                </Row>

            </div>  
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{marginTop:15}}>
          <Col span="5">
            <div className="">
                <Button type="primary" size="large" onClick={this.handSubmit}>确认并发布</Button>
            </div>
          </Col>
        </Row>
      </div>

        
    );
  },
  componentDidUpdate(){
    setTimeout(function(){
      $("#slideBox_"+this.state.index).slide({mainCell:".bd ul",effect:"fade",autoPlay:true,interTime:5000});
    }.bind(this),500)
  },
  componentDidMount(){
    
    $.get(CONFIG.HOSTNAME+'/client/guide',function(ajaxdata){
          console.log(ajaxdata);
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            var fileList = []
            data = ajaxdata.data.meta.guide_img;
             for( let key in data){
                  fileList.push({
                    uid: parseInt(key)+1,
                    status: 'done',
                    url: CONFIG.DONAME+data[key]
                  })
             }

            this.setState({
              fileList,
              status : !this.state.status
            })

            setTimeout(function(){
                $("#slideBox_"+this.state.index).slide({mainCell:".bd ul",effect:"fade",autoPlay:true,interTime:5000});
            }.bind(this),500);

          }  
      }.bind(this));
 
  }
});

export default  Guide;
