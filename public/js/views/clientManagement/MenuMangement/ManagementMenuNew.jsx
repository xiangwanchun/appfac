import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../../css/ManagementMenu.less'
import {Row, Col,Icon,Upload,Button, Input,Alert,Form,Modal,message} from 'antd';

import ContConf from './ConfPopupWindow/ContConfPup';

const createForm = Form.create;
const FormItem = Form.Item;
const uploadprops = {
  name: 'file',
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  }
};

var listData = {
		'1' : ['category','name',' icon','sname','catname','bddh'],
		'2' : ['category','name','link']
	}
let MenuFormNew = React.createClass({
  getInitialState() {
    return {
       loading: false,
       visible: false,
       titleNum:'0',
   	   title2Num : '0',
   	   src:'',
       levedata: {
	       	    "id": "",
	       	    "pid": "",
	       	    "children": "6,7",
	       	    "categoryName": "",
	       	    "category": "",
	       	    "name": "",
	       	    "sname": "",
	       	    "icon":'',
	       	    "catname": [],
				"catid": "",
				"modelName": [],
			    "model": "",
			    "updated_at": ""
       },
       data : {
       		
       },
       model:[] //弹出框数据
 
    };
  },
   getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  },
  componentWillMount:function(){
  	    //加载时获得数据
		var  levedata = this.state.levedata;
		     levedata.id = this.props.data.id;
		     levedata.pid = this.props.data.pid;
		     levedata.children = this.props.data.children;
		     levedata.category = this.props.data.category;
			 levedata.categoryName=this.props.data.categoryName;
			 levedata.icon= this.props.data.icon;
			 levedata.catname = this.props.data.catname;
			 levedata.catid = this.props.data.catid;
			 levedata.modelName = this.props.data.modelName;
			 levedata.model =this.props.data.model;
			
  },
   showModal(a,b) {
   	this.state.model.push(a,b)
    this.setState({
    	visible:true
    })

  },
  handleaddALL(a,b){

  for(var i=0;i<b.length;i++){
  	a.push(b[i])
   }
	 b.splice(0,b.length)
		 this.setState({
		 	model: this.state.model
		 })
  },   
  handledeleALL(a,b){
  	  for(var i=0;i<a.length;i++){
  		b.push(a[i])
  }
		a.splice(0,a.length)

		 this.setState({
			 	model: this.state.model
			 })
  },
    handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
   handleSubmit(e) {
   
    e.preventDefault();
    this.props.ajaxdata(this.state.levedata);
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });

  },
  inputNum(name,Navname,rule, value, callback) {
      if(value){
      	var  levedata = this.state.levedata;
  			 levedata[Navname] = value
	        this.setState({
	          [name] : value.length
	        })

      }
      callback();
  },
  //上传变换的时候
  uploadChange(name,info){
    console.log(info)
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var levedata = this.state.levedata;
          var src = 'http://172.16.148.16';
          levedata[name] = info.file.response.data.src;
          this.setState({
              levedata,
              src:src+levedata[name]
          })
          console.log(this.state.levedata)
        }else{
          var errorsDes = typeof info.file.response.error.description;
         /* alert(errorsDes)*/
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

	render(){ 
		var data = this.props.data;
		
		var  levepage =data.pid==0 ? true : false;//判断当前为几级页面
		var  levedata = this.state.levedata;
		//类容分类
		var categorycont =data.catalog_selected.map(function(ele,index) {
		 return	<span className='ContCategory' key={index}>{ele.name}</span>
		})
		//模型分类
		var categorymodel =data.model_selected.map(function(ele,index) {
		 return	<span className='ModelCategory' key={index}>{ele.name}</span>
		})
	    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
	    const titleProps = getFieldProps('title', {
	       validate: [{
	        rules: [
	          { required: true ,message: '请输入导航名称'},
	        ],
	        trigger: 'onBlur',
	      }, {
	        rules: [
	          { max : 4 , message: '长度必须小于4' },
	          { validator: this.inputNum.bind(this,'titleNum','name') }
	        ],
	        trigger: ['onBlur', 'onChange'],
	      }]
	    });

	     const title2Props = getFieldProps('title2', {
	       validate: [{
	        rules: [
	          { required: false ,message: '请输入二级页面名'},
	        ],
	        trigger: 'onBlur',
	      }, {
	        rules: [
	          { max : 4 , message: '长度必须小于4' },
	          { validator: this.inputNum.bind(this,'title2Num','sname') }
	        ],
	        trigger: ['onBlur', 'onChange'],
	      }]
	    });

	     //文件上传处理
	    const _this = this;
	    const icon = {
	              name: 'file',
	              action: '/factory/upload',
	              listType:"text" ,
	              onChange(info) {
	                  _this.uploadChange('icon',info);              
	              }
	            };
	       let category  = this.props.data.category;
	       let showListData = listData[category];
	       let html;

	   /*    var listData = {
		'1' : ['category','name',' icon','sname','catname','bddh'],
		'2' : ['category','name','link']
	}*/

		return (
			<div className='MenuFormMian'>
			  <Form horizontal form={this.props.form}>
				<div className='MenuFormCont'>
					<div>
						<div className='MenuFormColCont' style={showListData.indexOf('name') != -1 ?{display:'block'}:{display:'none'}}>
						 <Row>
						 	<Col span='24'>
						 		<FormItem
						          label="类型 :"
						          labelCol={{ span:5}}
	  							  wrapperCol = {{ span: 12 }}
									>
						        <span className='Category wrapperColheight'>{levedata.categoryName}</span>
						        </FormItem>
						    </Col>
						 </Row>	
						</div>
						<div className='MenuFormColCont' style={showListData.indexOf('category') != -1 ?{display:'block'}:{display:'none'}}>
							<Row>
								 <Col span='24'>
								        <div className="inputNumWrap">
						                    <FormItem
						                      id="control-input"
						                      label="导航名称 :"
						                      labelCol={{ span:5}}
						                      wrapperCol={{ span:8}}
						                      >    
						                      <Input id="control-input" placeholder={data.name}  {...titleProps}/>
						                    </FormItem>
						                    <span className="inputNum" style={{right:180}}><i style={{"color" : this.state.titleNum > 4 ? '#ff5d3d' : ''}}>{this.state.titleNum}</i>/4</span>
						                </div>
							      </Col>  
							</Row>
						</div>
						<div className='MenuFormColCont' style={showListData.indexOf('icon') != -1?{display:'block'}:{display:'none'}}>

							<Row>
								<Col span='5' className="colFormItem">
									导航图标 :
								</Col>
								<Col span='19'>
								
										<div className='NavBerImg'>
												<div className='UpImg'>
												 <img src={this.state.src}/>
												</div>
												
											</div>
											<div className='NavBerInstr'>
												<span className='Details1'>图标要求 PNG格式 ，60x60</span>
												<span className='Details2'>图标制作示例</span>
												<div className='chosebtn'>
													<Upload {...icon} data={{"type" :'icon'}} >
									                    <Button type="primary">
									                       点击上传
									                    </Button>
									                 </Upload>
												</div>	 
											</div>	
									
								</Col>
							</Row>
						</div>
						<div className='MenuFormColCont'>
							<Row>
								<Col span='24'>
							        <div className="inputNumWrap">
					                    <FormItem
					                      id="control-input"
					                      label="二级页面名 :"
					                      labelCol={{ span:5 }}
					                      wrapperCol={{ span:8}}
					                      >    
					                      <Input id="control-input"  placeholder={data.sname} {...title2Props}/>
					                    </FormItem>
					                    <span className="inputNum" style={{right:180}}><i style={{"color" : this.state.title2Num > 4 ? '#ff5d3d' : ''}}>{this.state.title2Num}</i>/4</span>
					                </div>
							      </Col>  
							</Row>
						</div>

						<div className='MenuFormColCont'>
							<Row>
							    <Col span='24'>
									<FormItem
									          label="内容分类 :"
									          labelCol={{ span:5}}
			      							  wrapperCol = {{ span:18}}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,data.catalog_selected,data.catalog_unselected)}>{categorycont}</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.visible}
							          width="755"
							          title="配置内容分类" 
							          onOk={this.handleOk} onCancel={this.handleCancel} onadd={this.handleaddALL} ondele={this.handledeleALL}
							          footer={[
							          	<Button key="addALL" type="ghost" size="large" onClick={this.handleaddALL.bind(this,data.catalog_selected,data.catalog_unselected)}>添加全部</Button>,
							          	<Button key="deleALL" type="ghost" size="large" onClick={this.handledeleALL.bind(this,data.catalog_selected,data.catalog_unselected)}>删除全部</Button>,
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							          <ContConf {...data} model = {this.state.model}/>
							        </Modal>		
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont'>
							<Row>
							    <Col span='24'>
									<FormItem
									          label="绑定导航 :"
									          labelCol={{ span:5}}
			      							  wrapperCol = {{ span:18}}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,data.catalog_selected,data.catalog_unselected)}>绑定导航</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.visible}
							          width="755"
							          title="配置内容分类" 
							          onOk={this.handleOk} onCancel={this.handleCancel} onadd={this.handleaddALL} ondele={this.handledeleALL}
							          footer={[
							          	<Button key="addALL" type="ghost" size="large" onClick={this.handleaddALL.bind(this,data.catalog_selected,data.catalog_unselected)}>添加全部</Button>,
							          	<Button key="deleALL" type="ghost" size="large" onClick={this.handledeleALL.bind(this,data.catalog_selected,data.catalog_unselected)}>删除全部</Button>,
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							          <ContConf {...data} model = {this.state.model}/>
							        </Modal>		
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont'>
							<Row>
							    <Col span='24'>
									<FormItem
									          label="列表样式 :"
									          labelCol={{ span:5}}
			      							  wrapperCol = {{ span:18}}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,data.catalog_selected,data.catalog_unselected)}>默认样式</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.visible}
							          width="755"
							          title="配置内容分类" 
							          onOk={this.handleOk} onCancel={this.handleCancel} onadd={this.handleaddALL} ondele={this.handledeleALL}
							          footer={[
							          	<Button key="addALL" type="ghost" size="large" onClick={this.handleaddALL.bind(this,data.catalog_selected,data.catalog_unselected)}>添加全部</Button>,
							          	<Button key="deleALL" type="ghost" size="large" onClick={this.handledeleALL.bind(this,data.catalog_selected,data.catalog_unselected)}>删除全部</Button>,
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							          <ContConf {...data} model = {this.state.model}/>
							        </Modal>		
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont'>
							<Row>
								<Col span='24'>
									<FormItem
									          label="模型分类 :"
									          labelCol={{ span: 5 }}
			      							  wrapperCol = {{ span: 18 }}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,data.model_selected,data.model_unselected)}>{categorymodel}</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.visible}
							          width="755"
							          title="配置模型分类" 
							          onOk={this.handleOk} onCancel={this.handleCancel} onadd={this.handleaddALL} ondele={this.handledeleALL}
							          footer={[
							          	<Button key="addALL" type="ghost" size="large" onClick={this.handleaddALL.bind(this,data.model_selected,data.model_unselected)}>添加全部</Button>,
							          	<Button key="deleALL" type="ghost" size="large" onClick={this.handledeleALL.bind(this,data.model_selected,data.model_unselected)}>删除全部</Button>,
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							          <ContConf {...data} model = {this.state.model}/>
							        </Modal>	
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont'>
						 <Row>
						 	<Col span='24'>
						 		<FormItem
						          label="发布时间 :"
						          labelCol={{ span:5}}
	  							  wrapperCol = {{ span: 12 }}
									>
						        <span className='Category wrapperColheight'>发布时间</span>
						        </FormItem>
						    </Col>
						 </Row>	
						</div>

						<div className='MenuFormColCont'>
							<Row>
								<Col span='24'>
							        <div className="inputNumWrap">
					                    <FormItem
					                      label="外链地址 :"
					                      labelCol={{ span:5 }}
					                      wrapperCol={{ span:15}}
					                      >    
					                      <Input addonBefore="Http://"  placeholder={data.sname} {...title2Props}/>
					                    </FormItem>
					              
					                </div>
							      </Col>  
							</Row>
						</div>

						<div className='MenuFormColCont'>
							  <Col span='24'>
									<FormItem 
									wrapperCol={{ span: 10, offset:5 }}
									>
							          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
							        </FormItem>
						       </Col>
						</div>
					</div>
				</div>
			  </Form>
			</div>
			)
	}
})

MenuFormNew = createForm()(MenuFormNew);
export default  MenuFormNew;
