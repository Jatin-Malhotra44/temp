import {auth,firestore} from 'firebase'
import {authConstants} from './constants'

export const signup=(user)=>{
    return async (dispatch)=>{
        const db=firestore();
        
        dispatch({type:authConstants.USER_LOGIN_REQUEST})
        
        auth().createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            const currentUser=auth().currentUser
            currentUser.updateProfile({
                displayName:`${user.firstName} ${user.lastName}`
            })
            .then(()=>{
                db.collection('users').doc(data.user.uid)
                .set({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:data.user.email,
                    uid:data.user.uid,
                    createdAt:new Date(),
                    isOnline:true
                })
                .then(()=>{
                    const signedinUser={
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:data.user.email,
                        uid:data.user.uid,
                    }
                    localStorage.setItem('user',JSON.stringify(signedinUser))
                    console.log('Saved successfully...')
                    dispatch({
                        type:authConstants.USER_LOGIN_SUCCESS,
                        payload:{user:signedinUser}
                    })
                })
                .catch(error=>{
                    console.log(error)
                    dispatch({
                        type:authConstants.USER_LOGIN_FAILURE,
                        payload:{error}
                    })
                })
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const signin=(user)=>{
    return async dispatch=>{
        dispatch({type:authConstants.USER_LOGIN_REQUEST})
        auth().signInWithEmailAndPassword(user.email,user.password)
        .then(data=>{

            const db=firestore()
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline:true
            })
            .then(()=>{
                const name= data.user.displayName.split(" ")
                const firstName=name[0]
                const lastName=name[1]
                const signedinUser={
                    firstName,
                    lastName,
                    email:data.user.email,
                    uid:data.user.uid,
                }
                localStorage.setItem('user',JSON.stringify(signedinUser))
                dispatch({
                    type:authConstants.USER_LOGIN_SUCCESS,
                    payload:{user:signedinUser}
                })
            })
            .catch(error=>console.log(error))
            
            console.log('Saved successfully...')
            
        })
        .catch(error=>{
            console.log(error)
            dispatch({
                type:authConstants.USER_LOGIN_FAILURE,
                payload:{error}
            })
        })
    }
}
export const isSignedUser=()=>{
    return async dispatch=>{
        const user=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null
        if(user){
            dispatch({
                type:authConstants.USER_LOGIN_SUCCESS,
                payload:{user}
            })
        }
        else{
            dispatch({
                type:authConstants.USER_LOGIN_FAILURE,
                payload:{error:'try signin again'}
            })
        }
    }
}
export const logout=(uid)=>{
    return async dispatch=>{
        dispatch({type:authConstants.USER_LOGOUT_REQUEST})
        
        const db=firestore()
        db.collection('users')
        .doc(uid)
        .update({
            isOnline:false
        })
        .then(()=>{
            auth().signOut()
            .then(()=>{
                localStorage.clear();
                dispatch({ type:authConstants.USER_LOGOUT_SUCCESS})
            })
            .catch(error=>{
                console.log(error)
                dispatch({ type:authConstants.USER_LOGOUT_FAILURE})
            })
        })
        .catch(error=>{console.log(error)})
    }
}