import React from "react"
import { connect } from 'react-redux'
import { addGUN, remGUN,addGunAsync} from './index.redux'

class App extends React.Component{
  
  render(){
    console.log(this.props)
    const num = this.props.num
    const addGUN = this.props.addGUN
    const remGUN = this.props.remGUN
    const addGunAsync = this.props.addGunAsync 
    return <div>
        <h1>{num}</h1>
        <button onClick={addGUN}>加</button>
        <button onClick={remGUN}>减</button>
        <button onClick={addGunAsync}>加</button>
      </div>
      
  }
}

const mapStatetoProp = (state) => {
  return {num:state}  
}

const actionCreactors = { addGUN, remGUN,addGunAsync}
App = connect(mapStatetoProp,actionCreactors)(App)
export default App