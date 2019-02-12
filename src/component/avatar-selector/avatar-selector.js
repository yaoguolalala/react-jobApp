import React from "react"
import { Grid } from "antd-mobile";
import ProppTypes from "prop-types" 

class AvatarSelector extends React.Component{
  static ProppTypes = {
    selectAvatar: ProppTypes.func
  }
  
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  render(){
    const avatarIcon = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
    const avatarList = avatarIcon.split(",").map((v) =>( {
      icon:require(`../img/${v}.png`),
      text:`${v}`
    }))
    const gridHeader = this.state.icon?
                      (<div>
                        <p style={{height:20+"px",lineHeight:20+"px",fontSize:15+"px",textAlign:"center"}}>已选择图像：
                          <img style={{width:20+"px",verticalAlign:"text-bottom"}} src={this.state.icon} alt=""/>
                        </p>
                      </div>):
                      (<div>
                        <p style={{height:20+"px",lineHeight:20+"px",textAlign:"center",fontSize:15+"px"}}>
                        请选择图像</p></div>)
    //console.log(avatarList)
    return(
      <div>
        {gridHeader}
        <Grid data = {avatarList}
              columnNum={5}
              onClick={(elm) => {
                this.setState(elm)
                this.props.selectAvatar(elm.text)
              }}></Grid>     
      </div>
    ) 
  }
}

export default AvatarSelector