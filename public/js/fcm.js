const messaging = window.messaging;

messaging
  .requestPermission()
  .then(function () {
    return messaging.getToken();
  })
  .then(function (token) {
    console.log('Device token:', token);
    // Send the token to your server or perform further actions
  })
  .catch(function (err) {
    console.log('Permission denied', err);
  });