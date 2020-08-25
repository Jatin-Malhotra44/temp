import {userConstants} from './constants'
import {firestore} from 'firebase'

export const getRealtimeUsers=(uid)=>{
    return async dispatch=>{
        dispatch({type:userConstants.GET_USERS_REQUEST})
        const db=firestore();
        const unsubscribe=db.collection("users")
        // .where("uid", "!=", uid)
        .onSnapshot((querySnapshot)=> {
        const users = [];
        
        querySnapshot.forEach(function(doc) {
            if(uid!=doc.data().uid){
                // console.log('same user')
                users.push(doc.data())
            }
        });
        dispatch({
            type:userConstants.GET_USERS_SUCCESS,
            payload:{users}
        })
    });
    return unsubscribe
    }
}
export const updateMessage=(msgObj)=>{
    return async dispatch=>{
        const db=firestore()
        db.collection('coversations')
        .add({
            ...msgObj,
            isView:false,
            createdAt: new Date()
        })
        .then(data=>{
            console.log(data)
            // dispatch({
            //     type:userConstants.MESSAGES_SUCCESS,
            //     payload:
            // })
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getRealtimeConversations=(user)=>{
    return async dispatch=>{
        const db=firestore()
        db.collection('coversations')
        .where('user_uid_1','in',[user.uid_1,user.uid_2])
        .orderBy('createdAt','asc')
        .onSnapshot((querySnapshot)=>{
            const conversations=[];
            querySnapshot.forEach(doc=>{
                if(
                    (doc.data().user_uid_1==user.uid_1 && doc.data().user_uid_2==user.uid_2)
                    ||
                    (doc.data().user_uid_1==user.uid_2 && doc.data().user_uid_2==user.uid_1)
                ){conversations.push(doc.data())}

                if(conversations.length>0){
                    dispatch({
                        type:userConstants.MESSAGES_SUCCESS,
                        payload: {conversations}
                    })
                }
                else{
                    dispatch({
                        type:userConstants.GET_USERS_FAILURE,
                        payload:{conversations}
                    })
                }
                
            })
            console.log(conversations)
        })    
    }
}