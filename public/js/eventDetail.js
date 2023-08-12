// Load the map when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
  const postId = document.getElementById("postId").value;
  loadPostDetail(postId);
});
let sortedComments;
// Add any additional map configuration or markers here

function loadPostDetail(postId) {
  fetch(`/postDetails?postId=${postId}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the received posts and update the UI
      const commentsToShowInitially = 5;
      const dataModel = data.posts.posts;
      const post = dataModel.post;
      const comments = dataModel.comments;
      const commentCount = comments.length;

      sortedComments =  comments.slice().sort((a, b) => a.createdAt - b.createdAt);
      sortedComments = sortedComments.slice().reverse();
      let visibleComments = sortedComments.slice(0, commentsToShowInitially);
      visibleComments = visibleComments.slice().reverse();
      let viewMore = false;
      if (sortedComments.length > commentsToShowInitially) {
        viewMore = true;
      }
      // Update the UI with the retrieved posts
      let postsHTML = "";
      const imageUrl = post.user.imageUrl
        ? `http://localhost:3000/post/images/${post.user.imageUrl}`
        : "images/avatar.png";
      postsHTML += `
            <div class="card card-shadow mt-3 mb-3">
              <div class="d-flex justify-content-between p-1 px-2">
                <div class="d-flex flex-row align-items-center">
                <img src="${imageUrl}" width="50" height= "50" class="rounded-circle"  alt="Profile image of ${
        post.user.name
      } who posted this event." />
                  <div class="d-flex flex-column ms-2">
                    <span class="fw-bold fs-5 post-name">${
                      post.user.name
                    }</span>
                    <small class="address-time">${
                      post.user.address ? post.user.address : ""
                    } • ${timeSince(post.createdAt)} •</small>
                  </div>
                </div>
              </div>
              ${
                post.image
                  ? `
              <img src="http://localhost:3000/post/images/${post.image}" alt ="${post.user.name} post"  class="img-fluid mb-1" height="435" width="580" tyle="margin: auto; />
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
                      ? `<button class="btn heart-button" type="button" data-post-id="${post._id}" onclick="toggleLike('${post._id}')"><i class="bi bi-heart" style="font-size: 20px; color: red;"></i><span class="visually-hidden">Like</span></button> Be First to like`
                      : `<button class="btn heart-button" type="button" data-post-id="${
                          post._id
                        }" onclick="toggleLike('${post._id}')">
                          <i class="bi ${
                            dataModel.userHasLiked
                              ? "bi-heart-fill"
                              : "bi-heart"
                          }" style="font-size: 20px; color: red;"></i>
                          <span class="visually-hidden">Like</span></button> ${
                            dataModel.likesCount
                          }`
                  }
                  
                </span>
                    <span class="comment-icon" onclick="moveFocusToCommentInput('${
                      post._id
                    })" ><i class="bi bi-chat" style="font-size: 20px;"></i>  ${
        commentCount === 0
          ? "No comments"
          : commentCount === 1
          ? "1 comment"
          : `${commentCount} comments`
      }</span>
                 
                </div>
                <hr />
                <div class="comments" id="${post._id}">
                ${
                  viewMore
                    ? `
                 
                    <button class="btn btn-link" id="viewMoreBtn" onclick="loadMoreComments('${post._id}', ${commentsToShowInitially})">Show More Comments</button>
                  `
                    : ""
                }
                <!-- Loop through comments and display them -->
                ${visibleComments
                  .map(
                    (comment) => `
                  <div class="d-flex flex-row comment-padding">
                  <img src="${
                    comment.user.imageUrl
                      ? `http://localhost:3000/post/images/${comment.user.imageUrl}`
                      : "images/avatar.png"
                  }" alt ="Profile image of ${
                      comment.user.name
                    }, who has passed in the comment." width="40" height="40" class="rounded-circle" />
                  <div class="d-flex flex-column ms-2">
                      <span class="fw-bold comment-name">${
                        comment.user.name
                      }  <small class="comment-address-time">${
                      comment.user.address ? comment.user.address : ""
                    } • ${timeSince(comment.createdAt)} •</small></span>
                     
                      <small class="comment-text">${comment.comment}</small>
                    </div>
                  </div>
                  <hr />
                `
                  )
                  .join("")}
                  

                  <div class="comment-input d-flex align-items-center">
                  <img src="${
                    data.posts.currentUserImage
                      ? `http://localhost:3000/post/images/${data.posts.currentUserImage}`
                      : "images/avatar.png"
                  }" alt='${
        data.name
      } profile image' width="40" height="40" class="rounded-circle" />
                  <div class="input-group">
                      <label for="comment-${
                        post._id
                      }" class="visually-hidden">Comment</label>
                      <input type="text" id="comment-${
                        post._id
                      }" class="form-control comment-form" placeholder="Add a comment..." onfocus="onCommentFocus(event, '${
        post._id
      }','${data.name}','${data.posts.currentUserImage}','${
        data.posts.currentUserAddress
      }')" onBlur="onCommentBlur(event, '${
        post._id
      }')" oninput="checkInput(this, 'commentButton-${
        post._id
      }')"  onkeypress="handleKeyPress(event, '${post._id}', '${data.name}', '${
        data.posts.currentUserImage
      }', '${data.posts.currentUserAddress}')"/>
              
                  </div>
                  <div class="comment-button-container" id="commentButtonContainer-${
                    post._id
                  }" style="display: none;"></div>
  
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

function loadMoreComments(postId, startIndex) {
  const commentsToShow = 5; // Change this to the number of comments to load each time

  // Get the comments starting from the provided index
  const startIndexForLoad = startIndex + commentsToShow;
  const endIndex = Math.min(startIndexForLoad, sortedComments.length);

  let commentsToLoad = sortedComments.slice(
    startIndex,
    endIndex
  );
  commentsToLoad = commentsToLoad.slice().reverse();

  const commentsContainer = document.getElementById(postId);

  // Create the HTML for the newly loaded comments
  const commentsHTML = commentsToLoad
    .map((comment) => {
      return `
        <div class="d-flex flex-row comment-padding">
          <img src="${
            comment.user.imageUrl
              ? `http://localhost:3000/post/images/${comment.user.imageUrl}`
              : "images/avatar.png"
          }" alt="Profile image of ${
        comment.user.name
      }, who has passed in the comment." width="40" height="40" class="rounded-circle" />
          <div class="d-flex flex-column ms-2">
            <span class="fw-bold comment-name">${comment.user.name}  <small class="comment-address-time">${
        comment.user.address ? comment.user.address : ""
      } • ${timeSince(comment.createdAt)} •</small></span>
            <small class="comment-text">${comment.comment}</small>
          </div>
        </div>
        <hr />
      `;
    })
    .join("");

  // Insert the new comments at the top of the container
  commentsContainer.innerHTML = commentsHTML + commentsContainer.innerHTML;

  // Update startIndex for the next load
  startIndex = startIndexForLoad;

  // Check if there are more comments to load
  const viewMore = sortedComments.length - startIndex >0;

  const existingShowMoreButton = document.getElementById("viewMoreBtn");
  if (existingShowMoreButton) {
    existingShowMoreButton.remove();
  }
  // Add the "Show More Comments" button if needed
  if (viewMore) {
    commentsContainer.innerHTML = `
      <button class="btn btn-link" id = "viewMoreBtn" onclick="loadMoreComments('${postId}', ${startIndex})">Show More Comments</button>
    ` + commentsContainer.innerHTML;
  }
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
