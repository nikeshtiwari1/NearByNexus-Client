function lockUser(userId) {
   
    console.log("Lock user with ID:", userId);

    fetch("/updateStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId,isLocked:true }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update user");
        }
      })
      .catch((error) => {
        console.error("Unable to update user");
      });

  }

  function unlockUser(userId) {
   
    console.log("Unlock user with ID:", userId);
    fetch("/updateStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId,isLocked:false }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update user");
        }
      })
      .catch((error) => {
        console.error("Unable to update user");
      });
  }

  function unlockPost(postId) {
   
    console.log("Unlock post with ID:", postId);
    fetch("/updatePostStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId,isBlocked:false }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("post succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update post");
        }
      })
      .catch((error) => {
        console.error("Unable to update post");
      });
  }

  function lockPost(postId) {
   
    console.log("Lock post with ID:", postId);

    fetch("/updatePostStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId,isBlocked:true }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("post succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update post");
        }
      })
      .catch((error) => {
        console.error("Unable to update post");
      });

  }

  function unlockComment(commentId) {
   
    console.log("Unlock comment with ID:", commentId);
    fetch("/updateCommentStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId,isBlocked:false }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("comment succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update comment");
        }
      })
      .catch((error) => {
        console.error("Unable to update comment");
      });
  }

  function lockComment(commentId) {
   
    console.log("Lock comment with ID:", commentId);

    fetch("/updateCommentStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId,isBlocked:true }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("omment succesfully updated");
          window.location.reload();
        } else {
          console.error("Unable to update comment");
        }
      })
      .catch((error) => {
        console.error("Unable to update comment");
      });

  }