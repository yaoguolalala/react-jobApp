//项目环境
import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware, compose} from 'redux'
import  thunk  from 'redux-thunk'

//状态管理和工具
import { Provider } from "react-redux"
import { HashRouter,Route,Redirect,Switch} from "react-router-dom"
import reducers from './reducer'
import "./config"

//页面组建
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from "./component/dashborad/dashborad"
import Chat from "./component/chat/chat"

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f => f

//创建一个store存放所有state
const store = createStore(reducers, compose( 
  applyMiddleware(thunk),//中间件，对action也就是对dispatch方法进行装饰。可以异步执行
  reduxDevtools))
//新建store，根据老的state和action，生成新的state


ReactDom.render(
  (<Provider store={store}>
    <HashRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/geniusinfo' component={GeniusInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
        </Switch>
      </div>
      
    </HashRouter>
    </Provider>
  ),
  document.getElementById("root")
)
