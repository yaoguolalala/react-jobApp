import React from "react"
import { connect } from "react-redux"
import { List, Badge } from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{

  getLastMsg(arr){
    return arr[arr.length-1]
  }
  render(){
    //console.log(this.props)
    const Item = List.Item
    const Brief = Item.Brief

    const userid  = this.props.user._id
    const userinfo = this.props.chat.users
    //console.log(userinfo)
    const chatmsg = this.props.chat.chatmsg
    const msgGroup = {}
    chatmsg.forEach(v=> {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    //console.log(msgGroup)
    const chatList = Object.values(msgGroup).sort((a,b) => {
      const a_last = this.getLastMsg(a).creat_time
      const b_last = this.getLastMsg(b).creat_time
      return b_last - a_last
    }) 
    console.log(chatList)
    return (
      <div>
       
          {chatList.map((v)=>{
            const lastmsg = this.getLastMsg(v)
            //console.log(v)
            const targetId = v[0].from==userid?v[0].to:v[0].from
            const unreadNum = v.filter(v =>!v.read&&v.to==userid).length
            if(!userinfo[targetId]){
              return null
            }
           
            //const name = userinfo[targetId]?userinfo[targetId].name:''
            //const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
            //console.log(name)
            return (
              <List  key={lastmsg._id}>
              <Item 
                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                extra={<Badge text={unreadNum}></Badge>}
                arrow="horizontal"
                onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
             >
                {userinfo[targetId].name}
                <Brief>
                  {lastmsg.content}
                </Brief>
              </Item>
              </List>
            )
          })}
      </div>
    )
  }
}

export default Msg