import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage,getRealtimeConversations } from '../redux/actions';

const User=(props)=>{
    const {data,onClick}=props
    return(
        <div onClick={()=>onClick(data)} className="displayName" >
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div style={{display:'flex',flex:1,justifyContent:'space-between',margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{data.firstName}</span>
                {/* <span className={data.isOnline?`onlineStatus`:`onlineStatus`}></span> */}
            </div>
        </div>
    )
}

const Home = (props) => {
    const dispatch=useDispatch()
    const auth=useSelector(state=>state.auth)
    const user=useSelector(state=>state.user)
    const [chat,setChat]=useState(false)
    const [chatUser,setChatUser]=useState('')
    const [message,setMessage]=useState('')
    const [userUid,setUserUid]=useState(null)
    const [bg,setBg]=useState('#e2e0e0')
    const [search,setSearch]=useState('')
    
    let unsubscribe;
    useEffect(()=>{
        unsubscribe=dispatch(getRealtimeUsers(auth.uid))
        .then(unsubscribe=>{
            return unsubscribe
        })
        .catch(error=>{console.log(error)})
        
    },[])

    useEffect(()=>{
        return ()=>{
            unsubscribe.then(f=>f()).catch(error=>console.log(error))
        }
    },[])
    
    const initChat=(user)=>{
        setChat(true)
        setChatUser(user.firstName)
        setUserUid(user.uid)
        console.log(user)
        dispatch(getRealtimeConversations({uid_1:auth.uid, uid_2:user.uid}))
        setBg('')
        
    }

    const submitMessage=(e)=>{
        const msgObj={
            user_uid_1:auth.uid,
            user_uid_2:userUid,
            message
        }
        //console.log(msgObj)
        if(message!==""){
            dispatch(updateMessage(msgObj))
            .then(()=>{
                setMessage('')
            })
        }
    }
    // console.log(user.conversations)
    return (
        <Layout>  
            <section className="container">
                <div className="listOfUsers">
                    <div style={{background:'rgb(211,211,211)'}}>
                        <input type='text' placeholder='Search' className='search'
                        value={search}
                        onChange={event=>{setSearch(event.target.value)}}          
                        />
                    </div>
                    {
                        user.users.length>0
                        ?
                        user.users.map(data=>{
                            if(search !==''&& data.firstName.toLowerCase().indexOf(search.toLowerCase())===-1){
                                return null
                            }
                            return(
                                <div className='userList'>
                                <User
                                onClick={initChat} 
                                key={data.uid} 
                                data={data}     
                                />
                                <div style={{borderBottom:'solid 1px rgb(211,211,211)'}}></div>
                                </div>
                                
                            )
                        })
                        :
                        null
                    }
                    
                            
                </div>
                <div style={{background:bg}} className="chatArea">
                    <div className="chatHeader">
                        {
                            chat?chatUser:''
                        }
                        
                        {user.firstName} 
                    </div>

                    <div className="messageSections">
                        {
                            chat?
                            user.conversations ?
                            user.conversations.map(con=>
                                <div style={{ textAlign: con.user_uid_1==auth.uid?'right': 'left' }}>
                                    <p className="messageStyle" >{con.message}</p>
                                </div>
                            ):<p className="messageStyle" >Start Conversation</p>
                            
                            :<div style={{textAlign:'center',marginTop:'150px',fontSize:'70px'}}>
                            <h1>Enter a chat to Continue</h1>
                            </div>
                        }
                        {/* {
                            console.log(user.conversations)
                        } */}
                    </div>
                        {
                            chat?
                            <div className="chatControls">
                                {/* <TextField id="standard-basic" label="Enter Message" 
                                value={message}
                                onChange={event=>{setMessage(event.target.value)}}
                                /> */}
                                <input className='textMessage'
                                placeholder='Enter Message' 
                                value={message}
                                onChange={event=>{setMessage(event.target.value)}}
                                />
                                <button onClick={submitMessage}
                                style={{background:'cyan',borderRadius:'10px'}}
                                >Send</button>
                            </div>
                            :null
                        }
                    
                </div>
            </section>
        </Layout>
    );
}
export default Home
