const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyCUHZoJXyaMM-1c4c5GpfC2YCtzSdjJLU8",
  authDomain: "nearbyneus.firebaseapp.com",
  projectId: "nearbyneus",
  storageBucket: "nearbyneus.appspot.com",
  messagingSenderId: "821092397881",
  appId: "1:821092397881:web:fdf07bb0bfc297c2656ee8",
  measurementId: "G-R03DGYGMF5",
};
firebase.initializeApp(firebaseConfig);

if (Notification.permission === "default") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      saveToken(firebase);
    } else {
      // Permission denied, handle accordingly
    }
  });
} else if (Notification.permission === "granted") {
  // Permission already granted, you can subscribe to push notifications
  // and obtain the device token
  saveToken(firebase);
} else {
  // Permission denied, handle accordingly
}

function saveToken(firebase) {
  const messaging = firebase.messaging();
  messaging
    .getToken({
      vapidKey:
        "BPXa6dx-ui6gxFmUVFlDIuyN9MEkJvdPERdbfCpfnMewn6iMBCzh_CEB2qoPr3FB_sb3Y4vrIN-PVg4xk4kFUZQ",
    })
    .then((token) => {
      console.log("Device token:", token);

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
    })
    .catch((error) => {
      console.error("Error retrieving device token:", error);
    });

  messaging.onMessage((payload) => {
    console.log("Received FCM message:", payload);
    // Show a browser notification with the received message
    showNotification(payload.notification.title, payload.notification.body);
  });
}

function showNotification(title, body) {
  const toastContainer = document.getElementById("toastContainer");

  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastElement.setAttribute("role", "alert");
  toastElement.setAttribute("aria-live", "assertive");
  toastElement.setAttribute("aria-atomic", "true");

  toastElement.innerHTML = `
    <div class="toast-header">
      <img src="./images/notification.png" class="rounded mr-2" alt="...">
      <strong class="mr-auto">${title}</strong>
      <small class = "ms-2">${getTimeString()}</small>
      <button type="button" class="btn-close justify-content-end ms-9" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${body}
    </div>
  `;

  // Append the toast element to the toast container
  toastContainer.appendChild(toastElement);

  // Create a new Bootstrap Toast instance
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000, // Display the toast for 5 seconds
  });

  // Show the toast
  toast.show();
  setTimeout(function () {
    window.location.reload();
  }, 3000);
}

function getTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
