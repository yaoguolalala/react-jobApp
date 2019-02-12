import React from 'react'
import Logo from "../../component/logo/logo"
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button,Toast} from "antd-mobile"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {Regisger} from "../../redux/user.redux"
import {redirectTo} from '../../util'
import "../../index.css"
@connect(
  state => state.user,
  {Regisger}
)

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:null
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.Regisger(this.state)
    //console.log(this.state)
    if(this.props.msg){
      this.showToastNoMask()
    }else{
      return null
    }
  }
  showToastNoMask() {
    Toast.info(this.props.msg, 2, null, false);
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <h2 style={{marginLeft:20+'px'}}>注册</h2>
        <List>
          <InputItem onChange={(value) =>this.handleChange('user',value) }>用户名</InputItem>
          <InputItem 
            type="password"
            onChange={(value) =>this.handleChange('pwd',value) }>密码</InputItem>
          <InputItem 
            type="password"
            onChange={(value) =>this.handleChange('repeatpwd',value) }>确认密码</InputItem>
        </List>
          <WhiteSpace size="lg"></WhiteSpace>
        <List>
          <RadioItem 
          checked={this.state.type == "genius"}
          onChange={() => {this.handleChange("type",'genius')}}
          >牛人</RadioItem>

          <RadioItem checked={this.state.type == "boss"}
           onChange={() => {this.handleChange("type",'boss')}}
          >BOSS</RadioItem>
        </List>
        <WhiteSpace size="lg"></WhiteSpace>
        <Button type="primary" size="large" onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }

}

export default Register