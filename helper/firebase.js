
import {setTokenFirebase} from '../helper/localStorage'

import firebase from 'firebase'

export const initialFirebase = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCZCmeg4F05qJ8jzvSl5vk6Zt8-CJOHSjw",
    authDomain: "shariacoin-a8033.firebaseapp.com",
    databaseURL: "https://shariacoin-a8033.firebaseio.com",
    projectId: "shariacoin-a8033",
    storageBucket: "shariacoin-a8033.appspot.com",
    messagingSenderId: "394002587857",
    appId: "1:394002587857:web:dab029894f44c02d47e5f0",
    measurementId: "G-0BE8B137E1"
  };
  
  if(typeof window !== 'undefined'){
    firebase.initializeApp(firebaseConfig);    
  }  

  if(('safari' in window && 'pushNotification' in window.safari)) return
  
  (async()=>{
    await navigator.serviceWorker.register("/firebase-messaging-sw.js")    
    const messaging = firebase.messaging()
    messaging.getToken({ vapidKey: 'BBmqhYwfMSgUob4Xx1Un9Ltf9rw6JUel8ucWzE7gUb_eQZe6sPf0UR7gHWV7a_A1tSR8WlrRiCfTFF_X8YkJeoI' }).then((currentToken) => {
      if (currentToken) {
        setTokenFirebase(currentToken)
      } else {        
        console.log('No registration token available. Request permission to generate one.');        
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);      
    });   

  })()

} 

export default firebase


