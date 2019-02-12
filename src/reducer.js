import { combineReducers } from "redux"
import { user } from "./redux/user.redux"
import { chatuser } from "./redux/chatuser.redux"
import { chat } from "./redux/chat.redux"
//合并reducer，当前只有userz这一个reducer
export default combineReducers({user,chatuser,chat})