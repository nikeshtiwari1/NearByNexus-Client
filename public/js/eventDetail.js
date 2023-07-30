// Load the map when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
  const postId = document.getElementById("postId").value;
  loadPostDetail(postId);
});

// Add any additional map configuration or markers here

function loadPostDetail(postId) {
  fetch(`/postDetails?postId=${postId}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the received posts and update the UI
      const dataModel = data.posts.posts;
      const post = dataModel.post;
      const comments = dataModel.comments;
      const commentCount = comments.length;
      // Update the UI with the retrieved posts
      console.log(post);
      let postsHTML = "";
      const imageUrl = post.user.imageUrl ? `http://localhost:3000/post/images/${post.user.imageUrl}` : 'images/avatar.png';
      postsHTML += `
            <div class="card card-shadow mt-3 mb-3">
              <div class="d-flex justify-content-between p-1 px-2">
                <div class="d-flex flex-row align-items-center">
                <img src="${imageUrl}" width="50" height= "50" class="rounded-circle" />
                  <div class="d-flex flex-column ms-2">
                    <span class="fw-bold fs-5 post-name">${
                      post.user.name
                    }</span>
                    <small class="address-time">${
                      post.user.address
                    } • ${timeSince(post.createdAt)} •</small>
                  </div>
                </div>
              </div>
              ${
                post.image
                  ? `
              <img src="http://localhost:3000/post/images/${post.image}" class="img-fluid mb-1" height="435" width="580" tyle="margin: auto; />
              `
                  : ""
              }
              <div class="p-1">
                <span class="text-justify post-discription lead ">${
                  post.postDescription
                }</span>
               
                  <div class=" d-flex flex-row justify-content-end muted-color mt-2">
                  <span class="like-icon" id="likeIcon-${post._id}">
                  ${
                    dataModel.likesCount === 0
                      ? `<button class="btn heart-button" type="button" data-post-id="${post._id}" onclick="toggleLike('${post._id}')"><i class="bi bi-heart" style="font-size: 20px; color: red;"></i></button> Be First to like`
                      : `<button class="btn heart-button" type="button" data-post-id="${
                          post._id
                        }" onclick="toggleLike('${post._id}')">
                          <i class="bi ${
                            dataModel.userHasLiked
                              ? "bi-heart-fill"
                              : "bi-heart"
                          }" style="font-size: 20px; color: red;"></i>
                        </button> ${dataModel.likesCount}`
                  }
                  
                </span>
                    <span class="comment-icon" ><i class="bi bi-chat" style="font-size: 20px;"></i>  ${
                      commentCount === 0
                        ? "No comments"
                        : commentCount === 1
                        ? "1 comment"
                        : `${commentCount} comments`
                    }</span>
                 
                </div>
                <hr />
                <div class="comments" id="${post._id}">
                <!-- Loop through comments and display them -->
                ${comments
                  .map(
                    (comment) => `
                  <div class="d-flex flex-row comment-padding">
                  <img src="${comment.user.imageUrl ? `http://localhost:3000/post/images/${comment.user.imageUrl}` : 'images/avatar.png'}" width="40" height="40" class="rounded-circle" />
                  <div class="d-flex flex-column ms-2">
                      <span class="fw-bold comment-name">${comment.user.name}  <small class="comment-address-time">${
                        comment.user.address
                      } • ${timeSince(comment.createdAt)} •</small></span>
                     
                      <small class="comment-text">${comment.comment}</small>
                    </div>
                  </div>
                  <hr />
                `
                  )
                  .join("")}
                 
                  <div class="comment-input d-flex align-items-center">
                  <img src="${data.posts.currentUserImage ? `http://localhost:3000/post/images/${data.posts.currentUserImage}` : 'images/avatar.png'}" width="40" height="40" class="rounded-circle" />
                  <input type="text" class="form-control comment-form" placeholder="Add a comment..." onkeyup="onComment('${
                      post._id
                    }','${data.name}',event)"/>
                  </div>
                </div>
              </div>
            </div>
          `;

      // Append the generated HTML to the container element
      const divElement = document.getElementById("loading-screen");

      // Check if the div element exists
      if (divElement) {
        // Remove the div from its parent
        divElement.parentNode.removeChild(divElement);
      }
      $("#postContainer").html(postsHTML);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error fetching posts:", error);
    });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
