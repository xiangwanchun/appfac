import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../../css/ManagementMenu.less'
import {Row, Col,Icon,Upload,Button, Input,Alert,Form,Modal,message} from 'antd';

import ContConf from './ConfPopupWindow/ContConfPup'
import MenuIconSet from './ConfPopupWindow/menuIconSet'
import NavModelType from './ConfPopupWindow/navModelType'
import CONFIG from '../../../config/API'

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
		'1' : ['category','name','icon','sname','cat','model'],//咨讯
		'2' : ['category','name','icon','sname','nav'],//精华
		'3' : ['category','name','icon','sname','cat','model','time'],//快讯
		'4' : ['category','name','icon','sname','list'],//专题
		'5' : ['category','name','icon','sname','cat','list'],//视频
		'6' : ['category','name','icon','sname','list'],//直播
		'7' : ['category','name','icon','sname'],//活动
		'8' : ['category','name','icon','sname','cat','list'],//图集
		'9' : ['category','name','icon','sname','link'],//外链
		'10' : ['category','name','icon','sname'],//积分商城
		'11' : ['category','name','icon','sname'/*,'banner','textare'*/],//爆料
		'12' : ['category','name','icon','sname','banner']//摇TV
	}
var showListData ;
let MenuFormNew = React.createClass({
  getInitialState() {
    return {
       loading: false,
       visible: false,
       titleNum:'0',
   	   title2Num : '0',
   	   textareaNum : '0',
   	   src:'http://demo.apps.sobeyyun.com/upload/icon/navigate/default.png',
       levedata: {
	       	    "id": "",
	       	    "pid": "",
	       	    "children": "",
	       	    "categoryName": "",
	       	    "category": "",
	       	    "name": "222",
	       	    "sname": "111",
	       	    "icon":'',
	       	    "catname": [],
				"catid": "",
				"modelName": [],
			    "model": "",
			    "updated_at": ""
       },
       data : {
       		
       },
       model:[], //弹出框数据
       modalType : '',//模型分类,看弹出的是哪个弹窗
       chooseIconModalVisible : false, // 导航图标选择
       catVisible : false,//内容分类弹窗
       modelVisible : false,//模型分类弹窗
       listVisible : false,//选择列表样式弹窗
       navVisible : false //导航绑定弹窗
 
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
  componentWillMount(){
  	//加载时获得数据
	var  levedata = this.props.data;
    this.setState({
    	levedata,
    	data : levedata
    })
  },
  componentWillReceiveProps(nextProps){
	//加载时获得数据
	var  levedata = nextProps.data;
    this.setState({
    	levedata,
    	data : levedata
    })
  },
   showModal(type,selected,unselected){
   	let modalType = type;
   	var model = [];
   	model.push(selected,unselected);
    this.setState({
    	model,
    	modalType,
    	[type] : true
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
		a.splice(1,a.length)

	this.setState({
		model: this.state.model
	})
  },
  handleOk() {
    this.setState({ 
    	[this.state.modalType]: false ,
    });
  },
  handleCancel() {
    this.setState({ 
    	[this.state.modalType]: false ,
    });
  },
   handleSubmit(e) {
   
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      let data = this.state.data;

       let postData = {
            "admin_id": data.admin_id,
            "banner": data.banner,
            "category": data.category,
            "catid": data.catalog_selected,
            "children": data.children,
            "end_time": data.end_time,
            "icon": data.icon,
            "id": data.id,
            "model": data.model_selected,
            "name": data.name,
            "navigate_id": data.navigate_id_selected,
            "order_by": data.order_by,
            "pid": data.pid,
            "sname": data.sname,
            "tip": data.tip,
            "_method" : 'put',
            'tenantid':tenantid[0]
        }
      if(postData.catid instanceof Array){

  		postData.catid = this.postDatafun(postData.catid);

      }
      if(postData.model instanceof Array){

  		postData.model = this.postDatafun(postData.model);

      }
      if(postData.navigate_id instanceof Array){
    	
  		postData.navigate_id = this.postDatafun(postData.navigate_id);

      }

  	 postData.navigate_style = this.props.data.style_list_selected.id;

      $.ajax({
          url: '/factory/navigate/'+data.id,
          type: 'post',
          data: postData,
          success: function(ajaxdata) {
          	let data = this.state.data;
	        ajaxdata = JSON.parse(ajaxdata);
	        if(ajaxdata.state){
              Modal.success({
                title: '成功信息',
                content: `导航信息保存成功`
              });
	        }else{
              Modal.error({
                title: '失败提示',
                content: `保存失败。`
              });
	        }  
          }.bind(this),
          
      })
      
    });

  },
  postDatafun(data){//将数组中的id提取出来处理成字符串
	let returnData = '';
	let len = data.length;
	for(let index in data){
		if(len-1 == index){
			returnData += data[index].id;
		}else{
			returnData += data[index].id + ',';
		}
	}
	return returnData;
  },
  inputNum(name,Navname,rule, value, callback) {//
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

      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var levedata = this.state.levedata;
          var src = 'http://demo.apps.sobeyyun.com';
          levedata[name] = info.file.response.data.src;
          this.setState({
              levedata,
              src:src+levedata[name]
          })
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
    listTypeFun(data){//设置导航列表类型
    	this.props.data.style_list_selected = data;
    },
	render(){ 

		let data = this.state.data;
		let  levepage =data.pid==0 ? true : false;//判断当前为几级页面
		let  levedata = this.state.levedata;
		//内容分类
		let categorycont = data.catalog_selected.map(function(ele,index) {
		 return	<span className='ContCategory' key={index}>{ele.name}</span>
		})

		if(!categorycont.length){
			categorycont.push("无分类");
		}

		//模型分类
		var categorymodel =data.model_selected.map(function(ele,index) {
		 return	<span className='ModelCategory' key={index}>{ele.name}</span>
		})


	    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
	    const titleProps = getFieldProps('title', {
	       validate: [{
	        rules: [
	          { required: false ,message: '请输入导航名称'},
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
	     const textareaProps = getFieldProps('textarea', {
		       validate: [{
		        rules: [
		          { required:false ,message: '请输入爆料内容'},
		        ],
		        trigger: 'onBlur',
		      }, {
		        rules: [
		          { max : 140 , message: '长度必须小于140' },
		          { validator: this.inputNum.bind(this,'textareaNum','sname') }
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
       showListData = listData[category];
       let html;
			
		return (
			<div className='MenuFormMian'>
			  <Form horizontal form={this.props.form}>
				<div className='MenuFormCont'>
					<div>
						<div className='MenuFormColCont' style={showListData.indexOf('category') != -1?{display:'block'}:{display:'none'}}>
						 <Row>
						 	<Col span='24'>
						 		<FormItem
						          label="类型 :"
						          labelCol={{ span:5}}
	  							  wrapperCol = {{ span: 12 }}
									>
						        <span className='Category wrapperColheight'>{this.props.data.categoryName}</span>
						        </FormItem>
						    </Col>
						 </Row>	
						</div>
						<div className='MenuFormColCont' style={showListData.indexOf('name') != -1?{display:'block'}:{display:'none'}}>
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
										 <img src={CONFIG.DONAME+ data.icon.on} title="导航图标"/>
										</div>	
									</div>
									<div className='NavBerInstr'>
										<span className='Details1'>图标要求 PNG格式 ，60x60</span>
										<span className='Details2'>图标制作示例</span>
										<div className='chosebtn'>
											<Button type="primary" onClick={this.showModal.bind(this,'chooseIconModalVisible')}>点击选择</Button>
										</div>	 
									</div>	

									<Modal ref="modal"
							          visible={this.state.chooseIconModalVisible}
							          width="755"
							          title="配置导航图标" 
							          onOk={this.handleOk} onCancel={this.handleCancel} 
							          footer={[									  
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							         	<MenuIconSet {...this.state.data}/>
							        </Modal>										
								</Col>
							</Row>
						</div>
						<div className='MenuFormColCont' style={showListData.indexOf('sname') != -1?{display:'block'}:{display:'none'}}>
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

						<div className='MenuFormColCont' style={showListData.indexOf('cat') != -1?{display:'block'}:{display:'none'}}>
							<Row>
							    <Col span='24'>
									<FormItem
									          label="内容分类 :"
									          labelCol={{ span:5}}
			      							  wrapperCol = {{ span:18}}
												>
												<div className='Category wrapperColheight' onClick={this.showModal.bind(this,'catVisible',data.catalog_selected,data.catalog_unselected)}>{categorycont }</div>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.catVisible}
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

						<div className='MenuFormColCont' style={showListData.indexOf('model') != -1?{display:'block'}:{display:'none'}}>
							<Row>
								<Col span='24'>
									<FormItem
									          label="模型分类 :"
									          labelCol={{ span: 5 }}
			      							  wrapperCol = {{ span: 18 }}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,'modelVisible',data.model_selected,data.model_unselected)}>{categorymodel}</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.modelVisible}
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

						<div className='MenuFormColCont' style={showListData.indexOf('nav') != -1?{display:'block'}:{display:'none'}}>
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
							          title="绑定导航" 
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

						<div className='MenuFormColCont' style={showListData.indexOf('list') != -1?{display:'block'}:{display:'none'}}>
							<Row>
							    <Col span='24'>
									<FormItem
									          label="列表样式 :"
									          labelCol={{ span:5}}
			      							  wrapperCol = {{ span:18}}
												>
												<span className='Category wrapperColheight' onClick={this.showModal.bind(this,'listVisible')}>{data.style_list_selected ? data.style_list_selected.name : '默认样式'}</span>
									</FormItem>	
									<Modal ref="modal"
							          visible={this.state.listVisible}
							          width="755"
							          title="列表样式" 
							          onOk={this.handleOk} onCancel={this.handleCancel}
							          footer={[
							            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
							            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
							              确 定
							            </Button>
							          ]}>
							          <NavModelType {...data} fun={this.listTypeFun}/>
							        </Modal>		
								</Col>
							</Row>
						</div>


						<div className='MenuFormColCont' style={showListData.indexOf('banner') != -1?{display:'block'}:{display:'none'}}>
							<Row>
								<Col span='12'>
									<FormItem
								          label="banner图 :"
								          labelCol={{ span:10}}
											>
										 <Upload {...uploadprops} className="upload-list-inline" onChange={this.upload}>
														<Button type="primary">
															点击上传
														</Button>
										 </Upload>
									</FormItem>	
								</Col>
								<Col span='8'>
									<span className='Details1 bannertip'>图标要求 PNG格式 ，100*100若不上传则不显示</span>
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont' style={showListData.indexOf('textare') != -1?{display:'block'}:{display:'none'}}>
							<Row>
								<Col span='24'>
								  <div className="inputNumWrap">
									<FormItem
								          label="提示语 :"
								          labelCol={{ span:5}}
		      							  wrapperCol = {{ span:18}}
											>
										<Input {...textareaProps} type="textarea" placeholder="爆料内容" id="textarea" name="textarea" />
									</FormItem>	
									<span className="inputNum textareaNum"><i style={{"color" : this.state.textareaNum > 140 ? '#ff5d3d' : ''}}>{this.state.textareaNum}</i>/140</span>
								  </div>
								</Col>
							</Row>
						</div>

						<div className='MenuFormColCont' style={showListData.indexOf('time') != -1?{display:'block'}:{display:'none'}}>
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

						<div className='MenuFormColCont' style={showListData.indexOf('link') != -1?{display:'block'}:{display:'none'}}>
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
