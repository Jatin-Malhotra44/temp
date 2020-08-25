import { authConstants } from '../actions/constants'

const initState={
    firstName:'',
    lastName:'',
    email:'',
    authenticating:false,
    authenticated:false,
    error:null
}

export default(state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case authConstants.USER_LOGIN_REQUEST:
            return {
                ...state,
                authenticating:true
            }
        case authConstants.USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.user,
                authenticated:true,
                authenticating:false
            }
        case authConstants.USER_LOGIN_FAILURE:
            return {
                ...state,
                error:action.payload.error,
                authenticated:false,
                authenticating:false
            }
        case authConstants.USER_LOGOUT_REQUEST:
            return {...state} 
        case authConstants.USER_LOGOUT_SUCCESS:
            return{
                ...initState
            }
        case authConstants.USER_LOGOUT_FAILURE:
            return{
                ...state,
                error:action.payload.error
            }
        default:return state
    }
}