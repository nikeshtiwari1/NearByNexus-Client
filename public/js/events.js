document.addEventListener("DOMContentLoaded", function () {
  // Get references to the image input, image preview elements, and close icon
  const imageInput = document.getElementById("imageInput");
  const imagePreviewContainer = document.querySelector(
    ".image-preview-container"
  );
  const imagePreview = document.getElementById("imagePreview");
  const closeIcon = document.getElementById("closeIcon");
  const imageInputLabel = document.getElementById("imageInputLabel");

  // Function to reset the image preview and input
  function resetImagePreview() {
    imageInput.value = ""; // Empty the input value
    imagePreview.src = "#"; // Reset the image preview src
    imagePreview.style.display = "none"; // Hide the image preview
    closeIcon.style.display = "none"; // Hide the close icon
    imageInputLabel.style.display = "block"; // Show the label
  }

  // Listen for changes in the image input
  if (imageInput)
    imageInput.addEventListener("change", function () {
      const file = imageInput.files[0];
      if (file) {
        // Create a FileReader to read the selected image
        const reader = new FileReader();

        // Set up the FileReader onload event
        reader.onload = function (e) {
          // Update the image preview src with the selected image data URL
          imagePreview.src = e.target.result;
          // Show the image preview and close icon
          imagePreviewContainer.style.display = "block";
          imagePreview.style.display = "block";
          closeIcon.style.display = "block";
          imageInputLabel.style.display = "none"; // Hide the label
        };

        // Read the selected image as a data URL
        reader.readAsDataURL(file);
      } else {
        // If no image is selected, hide the image preview and close icon
        imagePreview.style.display = "none";
        closeIcon.style.display = "none";
        imagePreviewContainer.style.display = "none";
      }
    });

  // Listen for the close icon click event
  if (closeIcon)
    closeIcon.addEventListener("click", function () {
      // Reset the image preview and input
      resetImagePreview();
    });
});

const likeButtons = document.querySelectorAll(".heart-button");

function toggleLike(postId) {
  const likeButton = document.querySelector(
    `button.heart-button[data-post-id="${postId}"]`
  );

  if (likeButton) {
    const likeIcon = likeButton.querySelector("i");

    likeIcon.classList.toggle("bi-heart");
    likeIcon.classList.toggle("bi-heart-fill");
    likeIcon.style.color = likeIcon.classList.contains("bi-heart-fill")
      ? "red"
      : "";

    fetch("/post/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log("API response:", data);
        const likes = data.data.data.likes;
        const likeIconElement = document.getElementById(`likeIcon-${postId}`);
        if (likeIconElement) {
          likeIconElement.innerHTML = `
                <span class="like-icon" id="likeIcon-${postId}">
                ${
                  likes.likesCount === 0
                    ? `<button class="btn heart-button" type="button" data-post-id="${postId}" onclick="toggleLike('${postId}')"><i class="bi bi-heart" style="font-size: 20px; color: red;"></i></button> Be First to like`
                    : `<button class="btn heart-button" type="button" data-post-id="${postId}" onclick="toggleLike('${postId}')">
                        <i class="bi ${
                          likes.userHasLiked ? "bi-heart-fill" : "bi-heart"
                        }" style="font-size: 20px; color: red;"></i>
                      </button> ${likes.likesCount}`
                }
                </span>
              `;
        }
      })
      .catch((error) => {
        // Handle API error
        console.error("API error:", error);
      });
  }
}

function toggleInterested(postId) {
  const button = document.getElementById(`interested-${postId}`);
  
  // Simulate toggling the userHasInterest state
  const userHasInterest = !button.classList.contains("user-interested");
  
  // Update the button's CSS class and content based on the userHasInterest state
  if (userHasInterest) {
    button.classList.add("user-interested");
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    button.textContent = "Your are Interested";
  } else {
    button.classList.remove("user-interested");
    button.classList.add("btn-primary");
    button.classList.remove("btn-secondary");
    button.textContent = "Interested?";
  }
    fetch("/post/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log("API response:", data);
        const interests = data.data.data.interests;
        const interestCountElement = document.getElementById(`interest-count-${postId}`);
        if (interestCountElement) {
          interestCountElement.textContent = interests.interestCount > 0 ? interests.interestCount + " Interested" : '';
        }
      })
      .catch((error) => {
        // Handle API error
        console.error("API error:", error);
      });
  }

likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const postId = this.getAttribute("data-post-id");
    toggleLike(postId);
  });
});

// Function to handle the keyup event for comment inputs
function onComment(postId, name, imageUrl, address, event) {
  const inputField = document.getElementById(`comment-${postId}`);
  const button = document.getElementById(`commentButton-${postId}`);

  if (inputField.value.trim() === "") {
    button.style.display = "none";
  } else {
    button.style.display = "block";
  }
  const textBox = event.target;
  const comment = inputField.value;
  console.log("Comment submitted for post with ID", postId, ":", comment);

  // Send the POST request with fetch
  fetch("/post/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, comment: comment }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response
      console.log("API response:", data);

      // Clear the input field after posting the comment
      populateComment(postId, name, comment, imageUrl, address);
      inputField.value = "";
    })
    .catch((error) => {
      // Handle API error
      console.error("API error:", error);
    });

  // Clear the text box after submission
}

function populateComment(postId, name, comment, imageUrl, address) {
  const commentSection = document.getElementById(postId);
  const commentElement = document.createElement("div");
  commentElement.classList.add("d-flex", "flex-row", "mb-2");

  const avatarImage = document.createElement("img");
  if (imageUrl)
    avatarImage.src = "https://api-nearbunexus.onrender.com/post/images/" + imageUrl;
  else avatarImage.src = "images/avatar.png";
  avatarImage.width = "40";
  avatarImage.classList.add("rounded-circle");

  const commentContent = document.createElement("div");
  commentContent.classList.add("d-flex", "flex-column", "ms-2");

  const userName = document.createElement("span");
  userName.classList.add("fw-bold", "comment-name");
  userName.textContent = name;
  const addressTime = document.createElement("small");
  addressTime.classList.add("comment-address-time");
  addressTime.textContent = ` ${address ? address : ""} • ${timeSince(
    new Date()
  )} •`;

  const commentText = document.createElement("small");
  commentText.classList.add("comment-text");
  commentText.textContent = comment;
  userName.appendChild(addressTime);

  commentContent.appendChild(userName);
  commentContent.appendChild(commentText);

  commentElement.appendChild(avatarImage);
  commentElement.appendChild(commentContent);

  // Get the input comment field
  const inputComment = commentSection.querySelector(".comment-input");
  const hrElement = document.createElement("hr");
  commentSection.insertBefore(commentElement, inputComment);
  commentSection.insertBefore(hrElement, inputComment);
}

function onCommentBlur(event, postId) {
  const inputField = event.target;
  const inputGroup = event.target.closest(".input-group");

  if (inputField.value.trim() == "") {
    const commentButtonContainer = document.getElementById(
      `commentButtonContainer-${postId}`
    );
    const commentButton = document.getElementById(`commentButton-${postId}`);
    commentButtonContainer.removeChild(commentButton);
    inputGroup.style.width = "100%";
    commentButtonContainer.style.display = "none";
  }
}

function onCommentFocus(
  event,
  postId,
  name,
  currentUserImage,
  currentUserAddress
) {
  const inputField = event.target;
  const inputGroup = event.target.closest(".input-group");
  // const button = document.getElementById(`commentButton-${postId}`);
  // button.classList.add("has-text");
  const commentButtonContainer = document.getElementById(
    `commentButtonContainer-${postId}`
  );
  commentButtonContainer.style.display = "block";
  if (!commentButtonContainer.querySelector(`#commentButton-${postId}`)) {
    const commentButtonHtml = `
      <button class="btn btn-primary comment-button float-md-right" type="button" id="commentButton-${postId}" onclick="onComment('${postId}','${name}','${currentUserImage}','${currentUserAddress}',event)" disabled>Comment</button>
  `;
    commentButtonContainer.innerHTML = commentButtonHtml;
  }
  commentButtonContainer.classList.add("active");
  inputGroup.style.width = "";
}

function checkInput(input, buttonId) {
  const button = document.getElementById(buttonId);
  if (input.value.trim() !== "") {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

function handleKeyPress(
  event,
  postId,
  name,
  currentUserImage,
  currentUserAddress
) {
  if (event.key === "Enter") {
    onComment(postId, name, currentUserImage, currentUserAddress, event);
  }
}
function handleCommentIconKeydown(event, postId) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); 
    moveFocusToCommentInput(postId);
  }
}

function moveFocusToCommentInput(postId) {
  const inputField = document.getElementById(`comment-${postId}`);
  inputField.focus();
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("eventTitleImage"))
    document
      .getElementById("eventTitleImage")
      .addEventListener("change", function (event) {
        const previewImage = document.getElementById("event-imagePreview");
        const selectedImage = event.target.files[0];

        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = function () {
            previewImage.src = reader.result;
          };
          reader.readAsDataURL(selectedImage);
        } else {
          previewImage.src = "./images/event-bg.png"; // Set default image if no image selected
        }
      });

  // Function to handle the "Okay" button click in the map modal
  function mapMadalClicked() {
    // Close the map modal
    const mapModal = new bootstrap.Modal(document.getElementById("mapModal"));
    mapModal.hide();

    // Optionally, you can do something else here after the modal is closed
  }
});
function focusOnPostDescription() {
  const postDescriptionInput = document.getElementById("postDescription");
  if (postDescriptionInput) {
    postDescriptionInput.focus();
  }
}