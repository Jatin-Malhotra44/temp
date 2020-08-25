import React, { useState } from 'react'
import './style.css';
import {signup} from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Layout from '../components/Layout';
import { Redirect } from 'react-router-dom';

const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const dispatch=useDispatch()
    const auth=useSelector(state=>state.auth)
    const userSignup=(e)=>{
        e.preventDefault();
        const user={
            firstName,lastName,email,password 
        }
        dispatch(signup(user))
    }
    if(auth.authenticated){
        return <Redirect to={`/`} />
    }
    return (
        <Layout>
        <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h3 className="heading">Sign Up</h3>
            <form onSubmit={userSignup}>
                <input className="joinInput" 
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={event=>{setFirstName(event.target.value)}}
                />
                <input type='text'
                    className="joinInput mt-20"
                    placeholder='Last Name'
                    value={lastName}
                    onChange={event=>{setLastName(event.target.value)}}
                />
                <input type='text'
                    className="joinInput mt-20"
                    placeholder='Enter email'
                    value={email}
                    onChange={event=>{setEmail(event.target.value)}}
                />
                <input type='password'
                    className="joinInput mt-20"
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

export default Signup
