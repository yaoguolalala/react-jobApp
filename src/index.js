import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware, compose} from 'redux'
import  thunk  from 'redux-thunk'
import {counter} from "./index.redux"
import { Provider } from "react-redux"
import App from './App'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():() => {}
const store = createStore(counter, compose( applyMiddleware(thunk),reduxDevtools))
//新建store，根据老的state和action，生成新的state

console.log(store)
function render(){
  ReactDom.render(
    (<Provider  store={store}>
      <App />
    </Provider>),
    document.getElementById("root")
  )
}

render()
