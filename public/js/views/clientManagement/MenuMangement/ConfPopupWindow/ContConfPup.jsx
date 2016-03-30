import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../../../css/ManagementMenu.less'
import {Row, Col,Icon,Upload,Button, Input,Alert,Form,Modal,message} from 'antd';

let ContConf = React.createClass({
getInitialState(){
 	return{
 		staue:'-1'
 		
 	}
 },
 componentWillReceiveProps(nextProps){

 },
 //已添加的判断是否选中
deleonselec(i){

	if(this.props.model[0].length == 1){
		message.warn('至少需要保留一个栏目');
		return;
	};
	this.setState({
		staue:i
	})

	this.props.model[1].push(this.props.model[0][i])
	this.props.model[0].splice(i,1);

	this.setState({
		staue:'-1'
	})
},
addselec(i){
	this.setState({
		staue:i
	})

	this.props.model[0].push(this.props.model[1][i])
	this.props.model[1].splice(i,1);

	this.setState({
		staue:'-1'
	})

},

	render(){
		
		var ContCategory = this.props.model[0].map(function(e,i){
			return 	<div className='ContBlock' key={e.id} style={i==this.state.staue?{display:'none'}:{display:'block'}} onClick={this.deleonselec.bind(this,i)}>
						<div className='ContName'>
						       <p>
						       		{e.name}
								</p>
						</div>
					</div>
		}.bind(this))

		var unContCategory = this.props.model[1].map(function(e,i){
			return 	<div className='unContBlock' key={e.id} style={i==this.state.staue?{display:'none'}:{display:'block'}} onClick={this.addselec.bind(this,i)}>
						<div className='ContName'>
						       <p>
						       		{e.name}
								</p>
						</div>
					</div>
		}.bind(this))

		return(
			<div className='PupMian'>
					<div className='onselec clearfloat'>{ContCategory}</div>
					<div className='hr'></div>	
			  
			 		<div className='unselec clearfloat'>{unContCategory}</div>
			</div>

				
			)
	}

})

export default  ContConf;