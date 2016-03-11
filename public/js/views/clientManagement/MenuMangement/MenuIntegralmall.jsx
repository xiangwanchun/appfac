import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../../css/ManagementMenu.less'
import {Row, Col,Icon,Upload,Button, Input,Alert,Form} from 'antd';
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

let MenuIntegralmall= React.createClass({
  getInitialState() {
    return {
       titleNum:'0',
   	   title2Num : '0',
   	   textareaNum:'0',
       levedata: {
	       	    "id": "",
	       	    "pid": "",
	       	    "categoryName": "",
	       	    "category": "",
	       	    "name": "",
	       	    "sname": "",
	       	    "icon":'',
	       	    "catname": [],
				"catid": "",
				"modelName": [],
			    "model": "",
       }
 
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
			 levedata.categoryName=this.props.data.categoryName;
			 levedata.icon= this.props.data.icon;
			 levedata.catname = this.props.data.catname;
			 levedata.catid = this.props.data.catid;
			 levedata.modelName = this.props.data.modelName;
			 levedata.model =this.props.data.model;
			 console.log(levedata)
  },
   handleSubmit(e) {
   
    e.preventDefault();
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
	render(){
		var  levedata = this.state.levedata;
		//类容分类
		var categorycont = this.props.data.catname.map(function(ele,index) {
		 return	<span className='ContCategory' key={index}>{ele}</span>
		})
		//视频列表
		var videolist = this.props.data.modelName.map(function(ele,index) {
		 return	<span className='ModelCategory' key={index}>{ele}</span>
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
		          { required: true ,message: '请输入导航名称'},
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
	    
		return (
			<div className='MenuFormMian'>
			  <Form horizontal form={this.props.form}>
				<div className='MenuFormCont'>
					<div className='MenuFormCol'>
						<div className='MenuFormColCont'>
						 <Row>
						 	<Col span='6'>
						 		<FormItem
						          label="类型 :"
						          labelCol={{ span: 10}}
	  							  wrapperCol = {{ span: 12 }}
									>
						        <span className='Category wrapperColheight'>{levedata.categoryName}</span>
						        </FormItem>
						    </Col>
						 </Row>	
						</div>
						<div className='MenuFormColCont' style={this.props.level==2?{display:'none'}:{display:'block'}}>
							<Row>
								 <Col span='6'>
								        <div className="inputNumWrap">
						                    <FormItem
						                      id="control-input"
						                      label="导航栏名称 :"
						                      labelCol={{ span:10 }}
						                      wrapperCol={{ span:12}}
						                      >    
						                      <Input id="control-input" placeholder={this.props.data.name}  {...titleProps}/>
						                    </FormItem>
						                    <span className="inputNum"><i style={{"color" : this.state.titleNum > 4 ? '#ff5d3d' : ''}}>{this.state.titleNum}</i>/4</span>
						                </div>
							      </Col>  
							</Row>
						</div>
						<div className='MenuFormColCont' style={this.props.level==2?{display:'none'}:{display:'block'}}>
							<Row>
								<Col span='15'>
									<FormItem
							          label="导航图标 :"
							          labelCol={{ span: 4}}
	      							  wrapperCol = {{ span: 18}}
										>
										<div className='NavBerImg'>
												<div className='UpImg'>
												 <img src={this.props.data.icon}/>
												</div>
												
											</div>
											<div className='NavBerInstr'>
												<span className='Details1'>图标要求 PNG格式 ，100*100</span>
												<span className='Details2'>图标制作示例</span>
												<div className='chosebtn'>
													<Upload {...uploadprops} className="upload-list-inline" onChange={this.upload}>
														<Button type="ghost">
															点击选择
														</Button>
													</Upload>
												</div>	 
											</div>	
									</FormItem>
								</Col>
								<Col span='10'>

								</Col>
							</Row>
						</div>
						<div className='MenuFormColCont'>
							<Row>
								<Col span='6'>
								        <div className="inputNumWrap">
						                    <FormItem
						                      id="control-input"
						                      label="二级页面名"
						                      labelCol={{ span:10 }}
						                      wrapperCol={{ span:12}}
						                      >    
						                      <Input id="control-input"  placeholder={this.props.data.sname} {...title2Props}/>
						                    </FormItem>
						                    <span className="inputNum"><i style={{"color" : this.state.title2Num > 4 ? '#ff5d3d' : ''}}>{this.state.title2Num}</i>/4</span>
						                
						                </div>
							      </Col>  
							</Row>
						</div>
						
						<div className='MenuFormColCont'>
							  <Col span='15' className='surmargintop'>
									<FormItem 
									wrapperCol={{ span: 10, offset:5 }}
									>
							          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
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

MenuIntegralmall = createForm()(MenuIntegralmall);
export default  MenuIntegralmall;
