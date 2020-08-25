import { userConstants } from "../actions/constants"

const initState={
    users:[],
    coversations:[]
}
export default (state=initState,action)=>{
    switch(action.type){
        case userConstants.GET_USERS_REQUEST:
            return{
                ...state
            }
        case userConstants.GET_USERS_SUCCESS:
            return{
                ...state,
                users:action.payload.users
            }
        case userConstants.GET_USERS_REQUEST:
            return{
                ...state
            }
        case userConstants.MESSAGES_SUCCESS:
            return{
                ...state,
                conversations:action.payload.conversations
            }

        default :return state
        
    }
}