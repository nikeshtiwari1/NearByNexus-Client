// public/js/firebase-client.js
// Import only the required Firebase modules
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyCUHZoJXyaMM-1c4c5GpfC2YCtzSdjJLU8",
  authDomain: "nearbyneus.firebaseapp.com",
  projectId: "nearbyneus",
  storageBucket: "nearbyneus.appspot.com",
  messagingSenderId: "821092397881",
  appId: "1:821092397881:web:fdf07bb0bfc297c2656ee8",
  measurementId: "G-R03DGYGMF5",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.log("here in ther");
// Find the active window client and post a message with the necessary information
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        const client = clientList.find((client) => client.focused) || clientList[0];
        if (client) {
          const messagingInfo = {
            vapidKey: messaging.app.options.vapidKey,
          };
          client.postMessage({ messagingInfo });
        }
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'INIT_FIREBASE_APP') {
    const firebaseConfig = event.data.config;
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    self.postMessage({ type: 'FIREBASE_MESSAGING_INSTANCE', messaging });
  }
});


// Handle push and notification events
self.addEventListener('push', (event) => {
  // ...
});

self.addEventListener('notificationclick', (event) => {
  // ...
});

// Additional event listeners and messaging logic can be added here

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
  // ...
});