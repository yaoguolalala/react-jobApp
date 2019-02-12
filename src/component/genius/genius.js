import React from "react"
import axios from "axios"
import {Card,WhiteSpace,WingBlank} from "antd-mobile"
import { getUserList } from "../../redux/chatuser.redux"
import { connect } from 'react-redux'
import  UserCard from "../usercard/usercard"

@connect(
  state =>state.chatuser,
  { getUserList }
)

class Genius extends React.Component{
  
  componentDidMount(){
    console.log(this.props)
    this.props.getUserList("boss")
  
  }
  render(){
    //console.log(this.state)
    
    return (
      <UserCard userlist={this.props.userlist}></UserCard>
    )
  }
}

export default Genius