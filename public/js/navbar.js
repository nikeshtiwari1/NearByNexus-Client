// script.js

// Function to update the notification count in the navigation batch element
function updateNotificationCount(count) {
  if(count){
    const notificationBatch = document.getElementById('notificationBatch');
    notificationBatch.textContent = count;
  }
  }
  
  // Function to fetch the notification count from the server
  async function fetchNotificationCount() {
    try {
      const response = await fetch(`/getNotificationCount`);
      if (!response.ok) {
        throw new Error('Error fetching notification count');
      }
  
      const data = await response.json();
      return data.data.notifications.count;
    } catch (error) {
      return 0;
    }
  }
  
  // Function to execute when the navigation bar is loaded
  function onNavbarLoad() {
    // Replace this with the actual user ID
    fetchNotificationCount()
      .then(notificationCount => {
        updateNotificationCount(notificationCount);
      });
  }
  
  // Register the onNavbarLoad function to be executed when the DOM is loaded
  document.addEventListener('DOMContentLoaded', onNavbarLoad);
  