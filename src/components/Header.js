import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../redux/actions'
const Header = (props) => {
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    // const onlogout=()=>{
    //     dispatch(logout())
    // }

    return (
        <div>
            <header className="header">
                <div style={{display: 'flex'}}>
                {/* <div className="logo"><NavLink to={'/'} className="logo">P-Chat</NavLink></div> */}
                    {/* {
                        !auth.authenticated
                        ?
                        <ul className="leftMenu">
                            <li><NavLink to={'/signin'}>Signin</NavLink></li>
                            <li><NavLink to={'/signup'}>Signup</NavLink></li>
                        </ul>
                        : null    
                    } */}
                 <ul className="leftMenu">
                    <li><NavLink to={'/signin'}>Signin</NavLink></li>
                    <li><NavLink to={'/signup'}>Signup</NavLink></li>
                </ul>   
                </div>
                <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>Hi {auth.authenticated?auth.firstName:""}</div>
                <ul className="menu">
                    {
                        auth.authenticated
                        ?
                        
                            <li>
                                <Link to={'#'} onClick={()=>{
                                    dispatch(logout(auth.uid))
                                }}>Logout</Link>
                            </li> 
                        
                        : null    
                    }
                </ul>
                
            </header>
        </div>
    )
}

export default Header
