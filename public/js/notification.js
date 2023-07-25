function handleNotificationClick(postId) {
   
    console.log(`Notification clicked! ID: ${postId}`);
  
    window.location.href = `/eventDetail?postId=${postId}`;
    
  }
  