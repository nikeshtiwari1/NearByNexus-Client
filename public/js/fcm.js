  const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyCUHZoJXyaMM-1c4c5GpfC2YCtzSdjJLU8",
  authDomain: "nearbyneus.firebaseapp.com",
  projectId: "nearbyneus",
  storageBucket: "nearbyneus.appspot.com",
  messagingSenderId: "821092397881",
  appId: "1:821092397881:web:fdf07bb0bfc297c2656ee8",
  measurementId: "G-R03DGYGMF5"
  };
  firebase.initializeApp(firebaseConfig);

  if (Notification.permission === 'default') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      // Permission granted, you can now subscribe to push notifications
      // and obtain the device token
    } else {
      // Permission denied, handle accordingly
    }
  });
} else if (Notification.permission === 'granted') {
  // Permission already granted, you can subscribe to push notifications
  // and obtain the device token
  const messaging = firebase.messaging();
  messaging.getToken({ vapidKey: 'BPXa6dx-ui6gxFmUVFlDIuyN9MEkJvdPERdbfCpfnMewn6iMBCzh_CEB2qoPr3FB_sb3Y4vrIN-PVg4xk4kFUZQ' }).then((token) => {
    console.log('Device token:', token);

fetch("/saveToken", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ token }),
})
  .then((response) => {
    if (response.ok) {
      console.log("Device token saved successfully");
    } else {
      console.error("Failed to save device token");
    }
  })
  .catch((error) => {
    console.error("Error saving device token:", error);
  });

  }).catch((error) => {
    console.error('Error retrieving device token:', error);
  });

} else {
  // Permission denied, handle accordingly
}
