import React from "react"
import PropTypes from "prop-types"
import {Card,WhiteSpace,WingBlank} from "antd-mobile"
import { withRouter } from "react-router-dom"

@withRouter
class UserCard extends React.Component{
  constructor(props){
    super(props)
    //this.handleClick = this.handleClick.bind(this)
  }
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  
  }

  render(){
    const Header = Card.Header
    const Body = Card.Body
    const Footer = Card.Footer 
    return (
      <WingBlank>
        {this.props.userlist.map(v=>(v.avatar?
          (<div key={v._id} >
          <Card onClick={() => {this.handleClick(v)}}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
              {v.desc.split("\n").map(v=>(
                <div key={v}>{v}</div>
              ))}
            </Body>
            <Footer content={v.type=="genius"?v.educ||null:v.company}
                    extra={v.type=="genius"?`期望薪资：${v.wantMoney||"不限"}`:`薪资待遇：${v.money}`}
            ></Footer>
          </Card>
          <WhiteSpace></WhiteSpace>
          </div>):null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard