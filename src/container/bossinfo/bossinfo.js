import React from 'react'
import { NavBar, Icon, InputItem, TextareaItem, WhiteSpace,Button } from 'antd-mobile'
import  AvatarSelector  from '../../component/avatar-selector/avatar-selector'
import {connect} from "react-redux"
import { update } from '../../redux/user.redux'
import { Redirect } from "react-router-dom"

@connect(
  state => state.user,
  {update}
)

class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:'',
      money:'',
      company:'',
      city:''
    }
  }

  onChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleUpdate(){
    this.props.update(this.state)
  }

  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect!==path ?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">
          BOSS信息完善
        </NavBar>
        <AvatarSelector
          selectAvatar={(icon) => {
            this.setState({
              avatar:icon
            })
          }}
        ></AvatarSelector>
        <WhiteSpace></WhiteSpace>
        <InputItem onChange={(value) => {this.onChange("title",value)}}>招聘职位</InputItem>
        <InputItem onChange={(value) => {this.onChange("company",value)}}>公司名称</InputItem>
        <InputItem onChange={(value) => {this.onChange("money",value)}}>职位薪资</InputItem>
        <InputItem onChange={(value) => {this.onChange("city",value)}}>所在城市</InputItem>
        <TextareaItem 
          onChange={(value) => {this.onChange("desc",value)}}
          rows={3}
          autoHeight
          title="职位要求">
          </TextareaItem>
          <Button type="primary" onClick={() => {this.handleUpdate()}}>保存</Button>
      </div>
    )
  }
}

export default BossInfo