import axios from "axios";
import { getRedirectPath } from "../util"


//const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
//const LOGIN_SUCESS = 'LOGIN_SUCESS'
const AUTH_SUCCESS = "AUTH_SUCCESS"
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState ={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}




export function user(state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state,...action.payload}
		case LOGOUT:
		return  {...initState,redirectTo:"/login"}
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		default:
			return state
	}
} 

export function  logoutSumit(){
	return { type:LOGOUT }
}

function errorMsg(msg){
	return { msg,type:ERROR_MSG }
}

export function loadData (userinfo){
	return { type:LOAD_DATA,payload:userinfo}
}

function authSuccess(data){
	return {type:AUTH_SUCCESS, payload:data}
}

export function login({user,pwd}){
	if(!user||!pwd){
		return errorMsg('用户名和密码必须输入')
	}
	return dispatch => {
		axios.post('/user/login',{user,pwd}).then(
			(res) => {
				if(res.status == 200 && res.data.code == 0){
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			}
		)
	}
}



export function Regisger ({user,pwd,repeatpwd,type}) {
	//校验密码,符合两种情况直接返回
	if(!user||!pwd||!type){
		return errorMsg('用户名密码必须输入')
	}
	if(pwd !== repeatpwd){
		return errorMsg('两次密码输入不一致')
	}
	return dispatch =>
		axios.post('/user/register',{user,pwd,type}).then(res => {
		if(res.status == 200 && res.data.code === 0){
			dispatch(authSuccess({user,pwd,type}))
		}else{
			dispatch(errorMsg(res.data.msg))
		}
	})
}

export function update(data){
	return dispatch => {
		axios.post('/user/update',data).then((res) => {
			if(res.status ==200 && res.data.code == 0){
				//console.log(res)
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export default user