import React, { useState } from 'react'
//import './style.css';
import './auth.css';
import Layout from '../components/Layout';
import {signin} from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch =useDispatch()
    const auth=useSelector(state=>state.auth)
    

    const userSignin=(e)=>{
        e.preventDefault();
        dispatch(signin({email,password}))
    }
    if(auth.authenticated){
        return <Redirect to={`/`} />
    }
    return (
        <Layout>
        <div className='joinOuterContainer'>
        <div className='joinInnerContainer'>
            <h3 className="heading">Sign In</h3>
            <form onSubmit={userSignin}>
                <input className="joinInput" 
                    type='text'
                    placeholder='Enter email'
                    value={email}
                    onChange={event=>{setEmail(event.target.value)}}
                />
                <input className="joinInput mt-20" 
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={event=>{setPassword(event.target.value)}}
                />
                <button className={'button mt-20'} onClick={()=>{}}>Signin</button>
            </form>
        </div>
        </div>
        </Layout>
    )
}

export default Signin
