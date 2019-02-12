import React from "react"
import { Switch , Route } from "react-router-dom"
import { NavBar,TabBar } from "antd-mobile"
import { connect } from "react-redux"
import  NavLinkBar from "../navlink/navlink"
import  Boss from '../boss/boss'
import Genius from "../genius/genius"
import User from "../user/user"
import Msg from "../msg/msg"
import { getMsgList ,sendMsg, recvMsg } from '../../redux/chat.redux'

//import {withRouter} from ""

@connect(
  state => state,
  {getMsgList,sendMsg,recvMsg}
)

class Dashborad extends React.Component{

  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render(){
    const user = this.props.user
    const pathname = this.props.location.pathname 
    const navList = [
      {
        path: "/boss",
        text:'牛人',
        icon: "boss",
        title:"牛人列表",
        component:Boss,
        hide:user.type == "genius"
      },
      {
        path: "/genius",
        text:'boss',
        icon: "job",
        title:"boss列表",
        component:Genius,
        hide:user.type == "boss"
      },
      {
        path: "/msg",
        text:'消息',
        icon: "msg",
        title:"消息列表",
        component:Msg,
        //hide:user.type == "boss"
      },
      {
        path: "/me",
        text:'我',
        icon: "user",
        title:"个人中心",
        component:User,
        //hide:user.type == "boss"
      }

    ]
    //console.log(pathname)
    if(pathname == "/"){
      this.props.history.push('login')
      return null
    }
    return (
      <div>
        <NavBar className='fixd-header'  mode="dard">{navList.find(v=>v.path==pathname).title}</NavBar>
        <div className="page-content">
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}>{v.text}</Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashborad