import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import MenuFormNew from './ManagementMenuNew';
import Elitepage from './Eliteguidepage';
import MenuNewsflash from './MenuNewsflash';
import MenuLive from './MenuLive';
import MenuVideolist from './MenuVideolist';
import MenuProjectlist from './MenuProjectlist';
import MenuImglist from './MenuImglist';
import MenuFact from './MenuFact';
import MenuShakeTV from './MenuShakeTV';
import MenuActivlist from './MenuActivlist';
import MenuIntegralmall from './MenuIntegralmall';
import MenuOutside from './MenuOutside';


const Menuall = React.createClass({
	getInitialState() {
	    return {
	       loading: false
	    }
	},
	ajaxdata(data){
		
	},
	componentDidMount(){
		$.get('/factory', { token: "fds", uid: 1 ,username:32 },function(ajaxdata){
            let data = this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              data = ajaxdata.data;
              this.setState({
                data
              })
            }  
      }.bind(this));
	},
	render(){
	    var menuprops = this.props;
		return (
			<div>
				{(function (obj) {
            var category = obj.props.data.category ? obj.props.data.category : '1';
             return <MenuFormNew {...menuprops} ajaxdata={obj.ajaxdata}/>

             
              if (category == '1'){
                return <MenuFormNew {...menuprops} ajaxdata={obj.ajaxdata}/>
              }
              else if( category == '2' ){
                return <Elitepage {...menuprops}/>
              }
              else if( category == '3' ){
                return <MenuNewsflash {...menuprops}/>
              }
              else if( category == '4' ){
                return <MenuProjectlist {...menuprops}/>
              }
               else if( category == '5' ){
                return <MenuVideolist {...menuprops}/>
              }
              else if( category == '6' ){
                return <MenuLive {...menuprops}/>
              }
              else if( category == '7' ){
                return <MenuActivlist {...menuprops}/>
              }
              else if( category == '8' ){
                return <MenuImglist {...menuprops}/>
              }
              else if( category == '9' ){
                return <MenuOutside {...menuprops}/>
              }
              else if( category == '10' ){
                return <MenuIntegralmall {...menuprops}/>
              }
              else if( category == '11' ){
                return <MenuFact {...menuprops}/>
              }
              else if( category == '12' ){
                return <MenuShakeTV {...menuprops}/>
              }
          })(this)}
			</div>
			);
	},
});
export default  Menuall;