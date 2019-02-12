import React from "react"
import axios from "axios"

import { getUserList } from "../../redux/chatuser.redux"
import { connect } from 'react-redux'
import UserCard from "../usercard/usercard"

@connect(
  state =>state.chatuser,
  { getUserList }
)

class Boss extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    console.log(this.props)
    this.props.getUserList("genius")
  
  }
  render(){
    console.log(this.state)
  
    return (
      <div>
        <UserCard userlist={this.props.userlist}></UserCard>
      </div>
    )
  }
}

export default Boss