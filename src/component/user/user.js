import React from "react"
import { connect } from "react-redux"
import { Result, List ,Brif, WhiteSpace, Button,Modal } from "antd-mobile"
import  browserCookie from "browser-cookies"
import {logoutSumit} from "../../redux/user.redux"
import {Redirect} from "react-router-dom"

const Item = List.Item
const Brief = List.Item.Brief



@connect(
  state => state.user,
  {logoutSumit}

)



class User extends React.Component{

  constructor(props){
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  
  logOut(){
   const alert = Modal.alert
   alert("注销","确认注销吗???",[
     {text:'取消',onPress:() => {console.log('cancle')}},
     {text:'确认',onPress:() => {
       browserCookie.erase("userid")
       //清除redux的状态  
       this.props.logoutSumit()
       //window.location.href =  window.location.href
     }}
   ])
  }

   
  render(){
   
    //const src = <img src={require(`../img/${avatar}.png`)}/>
    const props = this.props
    return props.user?(
      
      <div>
       
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50+"px"}} alt=""/>}
          title={this.props.user}
          message={props.type== "boss"?props.company:null}
        >
        </Result>
        <List renderHeader={() => "简介"}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split("\n").map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资待遇：{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item className="clickImport"  onClick={this.logOut}>退出登录</Item>
        </List>
      </div>
    ):<Redirect to={this.props.redirectTo}></Redirect>
  }
}

export default User