import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'
import {Provider} from 'react-redux'
import store from './redux/store'

const firebaseConfig = {
  apiKey: "AIzaSyC43PtzmJ0WLykTKsOZZQoItKfQGUXDY7s",
  authDomain: "p-chat-cb814.firebaseapp.com",
  databaseURL: "https://p-chat-cb814.firebaseio.com",
  projectId: "p-chat-cb814",
  storageBucket: "p-chat-cb814.appspot.com",
  messagingSenderId: "928003008466",
  appId: "1:928003008466:web:c0725f21e2374854e78a0b",
  measurementId: "G-FNSJXZR56B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

window.store=store

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
