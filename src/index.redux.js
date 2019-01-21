
//reducer

const ADD = "加"
const REM = "减"

export function counter( state = 0, action ){
  switch(action.type){
    case ADD: 
      return state +  1;
    case REM:
      return state -  1;
    default: 
      return state = 10
  }
}

//action creator
export function addGUN(){
  return {type:ADD}
}
export function remGUN(){
  return {type:REM}
}

export function addGunAsync(){
  return dispatch => {
    setTimeout(() => {
      dispatch(addGUN())
    },2000)
  }
}