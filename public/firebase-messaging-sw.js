importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCZCmeg4F05qJ8jzvSl5vk6Zt8-CJOHSjw",
  authDomain: "shariacoin-a8033.firebaseapp.com",
  databaseURL: "https://shariacoin-a8033.firebaseio.com",
  projectId: "shariacoin-a8033",
  storageBucket: "shariacoin-a8033.appspot.com",
  messagingSenderId: "394002587857",
  appId: "1:394002587857:web:dab029894f44c02d47e5f0",
  measurementId: "G-0BE8B137E1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload?.notification?.title;
  
  const notificationOptions = {
    body: payload?.notification?.body,    
    logo: "/logo2.webp"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

});