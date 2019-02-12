import React from "react"
import {List,InputItem, NavBar,Icon} from "antd-mobile"
import { connect } from "react-redux"
import { getMsgList ,sendMsg, recvMsg } from '../../redux/chat.redux'
import {getChatId} from '../../util'
import io from "socket.io-client"



const soket = io("ws://localhost:9093")

//@withRouter
@connect(
  state => state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text:'',
      msg:[]
    }
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
    /*
    soket.on('resvmsg',(data) => {
      console.log(data)
      this.setState({
        msg:[...this.state.msg,data.text]
      })
    })
    */
   
  }


  handleSumit(){
    const from = this.props.user._id //登陆用户：a2
    const to = this.props.match.params.user //对象用户 a3
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  render(){
    const from = this.props.user._id 
    const chatmsg = this.props.chat.chatmsg
    const Touser = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    const chatid = getChatId(Touser,from)
    const pureMsg = chatmsg.filter(v => v.chatid == chatid)
    //console.log(pureMsg)
    if(!users[Touser]){
      return null
    }
    //console.log(from)
    return (
      <div id="chat-page">
        <div id="navbar">
          <NavBar 
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() =>{  this.props.history.goBack()}}
            >
            {users[Touser].name}
          </NavBar>
        </div>
        <div id="msg-content">
          {pureMsg.map((v) => {
            const to_avatar = users[Touser].avatar
            const from_avatar = users[from].avatar
          //console.log(v.from)
            return v.from == Touser?(
              <List key={v._id}>
                <Item
                 thumb={require(`../img/${to_avatar}.png`)}
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item
                 extra={<img src={require(`../img/${from_avatar}.png`)}></img>}
                 className={"chat-me"}
                >{v.content}</Item>
              </List>
            )
          })}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={() => {this.handleSumit()}}>发送</span>}
            >聊天</InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat