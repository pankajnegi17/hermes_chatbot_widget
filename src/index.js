// import  materialize from 'materialize-css/dist/css/materialize.min.css';
import './components/matirialize-modal.css'
import './components/matirialize-zoom.css'
import './components/matirialize.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; 
// import swDev from './swDev'
import store from './store/index';
import {Provider} from 'react-redux';
// import firebase from './firebase'

ReactDOM.render( 
     <Provider  store={store}> 
      <App />
      </Provider>      
      , document.getElementById('chatbot-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// swDev()

// function ss(){
//   const msg = firebase.messaging();
//   console.log("msgm",msg)
//   msg.requestPermission().then(()=>{
//         return msg.getToken();
//   }).then(data=>{
//         console.log("Tocken",data)
//   })
//   .catch((err)=>{console.log(err)})    
// }

// ss()