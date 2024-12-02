import firebase from 'firebase/app';
import 'firebase/messaging';

// See: https://github.com/microsoft/TypeScript/issues/14877
/** @type {ServiceWorkerGlobalScope} */
let self;

function initInSw() {
  importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');


  firebase.initializeApp({
    apiKey: "AIzaSyBSkvGBdX6ZFP3xDTjdexCE_N0bHDcos2w",
    authDomain: "lugnarisnotificaciones.firebaseapp.com",
    projectId: "lugnarisnotificaciones",
    storageBucket: "lugnarisnotificaciones.firebasestorage.app",
    messagingSenderId: "637047483982",
    appId: "1:637047483982:web:5b93f957f24ea00e141d1f",
    measurementId: "G-90JXL7BGRL"
  });

  const messaging = firebase.messaging();
}

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}