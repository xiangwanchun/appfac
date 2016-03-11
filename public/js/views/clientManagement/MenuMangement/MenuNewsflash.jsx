import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../../css/ManagementMenu.less'
import {Row, Col,Icon,Upload,Button, Input,Alert,Form} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const props = {
  action: '/upload.do',
  listType: 'picture'
};

let MenuNewsflash = React.createClass({
  getInitialState() {
    return {
       titleNum:'0',
   	   title2Num : '0',
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
			    "end_time": ""
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
			 levedata.end_time = this.props.data.end_time;
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
  inputNum(name,rule, value, callback) {
      if(value){
        this.setState({
          [name] : value.length
        })
      }
      callback();
  },

	render(){
		//加载时获得数据
		var  levedata = this.state.levedata;
		//类容分类
		var categorycont = this.props.data.catname.map(function(ele,index) {
		 return	<span className='ContCategory' key={index}>{ele}</span>
		})
		//模型分类
		var categorymodel = this.props.data.modelName.map(function(ele,index) {
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
						                      <Input id="control-input"  placeholder="首页"  {...titleProps}/>
						                    </FormItem>
						                    <span className="inputNum"><i style={{"color" : this.state.titleNum > 10 ? '#ff5d3d' : ''}}>{this.state.titleNum}</i>/10</span>
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
												 <img src={this.state.src}/>
												</div>
												
											</div>
											<div className='NavBerInstr'>
												<span className='Details1'>图标要求 PNG格式 ，100*100</span>
												<span className='Details2'>图标制作示例</span>
												<div className='chosebtn'>
													<Upload {...props} className="upload-list-inline" onChange={this.upload}>
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
						                      label="导航栏名称"
						                      labelCol={{ span:10 }}
						                      wrapperCol={{ span:12}}
						                      >    
						                      <Input id="control-input"  placeholder="首页"  {...title2Props}/>
						                    </FormItem>
						                    <span className="inputNum"><i style={{"color" : this.state.title2Num > 10 ? '#ff5d3d' : ''}}>{this.state.title2Num}</i>/10</span>
						                </div>
							      </Col>  
							</Row>
						</div>
						<div className='MenuFormColCont'>
						    <Col span='15'>
								<FormItem
								          label="类容分类 :"
								          labelCol={{ span:4}}
		      							  wrapperCol = {{ span:18}}
											>
											<span className='Category wrapperColheight'>{categorycont}</span>
								</FormItem>			
							</Col>
						</div>
						<div className='MenuFormColCont'>
							<Col span='15'>
								<FormItem
								          label="模型分类 :"
								          labelCol={{ span: 4 }}
		      							  wrapperCol = {{ span: 18 }}
											>
											<span className='Category wrapperColheight'>{categorymodel}</span>
								</FormItem>	
							</Col>
						</div>
						<div className='MenuFormColCont'>
							<Col span='15'>
								<FormItem
								          label="发布时间:"
								          labelCol={{ span: 4 }}
		      							  wrapperCol = {{ span: 18 }}
											>
											<span className='Category wrapperColheight'>{levedata.end_time}</span>
								</FormItem>	
							</Col>
						</div>
						
					</div>
				</div>
				<FormItem wrapperCol={{ span: 10, offset:5 }}>
		          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
		          &nbsp;&nbsp;&nbsp;
		        </FormItem>
			  </Form>
			</div>
			)
	}
})

MenuNewsflash = createForm()(MenuNewsflash);
export default  MenuNewsflash;
