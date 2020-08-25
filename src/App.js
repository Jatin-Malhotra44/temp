import React, { useEffect } from 'react';
import Signup from './containers/Signup';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './containers/Home';
import PrivateRoute from './components/PrivateRoute';
import Signin from './containers/Signin';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { isSignedUser } from './redux/actions';

const App=()=>{
  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!auth.authenticated){
        dispatch(isSignedUser())
    }
  },[])
  return (
    <BrowserRouter>
    <div className="App">
      <PrivateRoute path='/' exact component={Home}/>
      <Route path='/signup' exact component={Signup}/>  
      <Route path='/signin' exact component={Signin}/>  
    </div>
    </BrowserRouter>
);
}

export default App;
