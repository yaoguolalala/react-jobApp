import React from 'react'
import Logo from "../../component/logo/logo"
import {List,InputItem,WingBlank,WhiteSpace,Button,Toast} from "antd-mobile"
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from "react-router-dom"
@connect(
  state => state.user,
  {login}
  )

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register(){
    console.log(this.props)
    this.props.history.push('register')
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleLogin(){
    this.props.login(this.state)
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
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!="/login"?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <h2 style={{marginLeft:20+'px'}}>登录</h2>
        <WingBlank size="lg">
          <List>
            <InputItem
              onChange={(value) => {this.handleChange('user',value)}}
            >用户</InputItem>
            <InputItem
               onChange={(value) => {this.handleChange('pwd',value)}}
               type="password"
            >密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button 
            type="primary"
            onClick = {this.handleLogin}
          >登录</Button>
          <WhiteSpace size="xl"></WhiteSpace>
          <Button type="primary" onClick={this.register} >没有账号? 注册一下</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login