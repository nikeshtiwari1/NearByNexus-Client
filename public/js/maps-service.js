function initMap() {
  // Create a map centered at a specific location
}
let locLongitude, locLatitude;
// Load the map when the page finishes loading
window.onload = function () {
  initMap();
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locLatitude = latitude;
      locLongitude = longitude;
      loadNearByPosts(longitude, latitude);
      document.getElementById("latitude").value = latitude;
      document.getElementById("longitude").value = longitude;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: locLatitude, lng: locLongitude },
        zoom: 12,
      });
      const marker = new google.maps.Marker({
        position: { lat: locLatitude, lng: locLongitude }, // Set the marker position
        map: map,
        draggable: true, // Allow the marker to be draggable
      });
      // Event listener for marker dragend event
      google.maps.event.addListener(marker, "dragend", function () {
        const markerPosition = marker.getPosition(); // Get the updated marker position
        console.log(
          "Marker position:",
          markerPosition.lat(),
          markerPosition.lng()
        );
        document.getElementById("latitude").value = markerPosition.lat();
        document.getElementById("longitude").value = markerPosition.lng();
        // You can use the marker position for further processing or storing the coordinates
      });
    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser");
}

// Get the buttons to open and close the modals
const openMapButton = document.getElementById("openMapButton");
const closeMapButton = document.getElementById("closeMapButton");
const postModal = document.getElementById("postMaodal");
const mapModal = document.getElementById("mapModal");

// Show the map modal initially
const mapModalInstance = new bootstrap.Modal(mapModal);

// Listen for the hidden.bs.modal event on the map modal
mapModal.addEventListener("hidden.bs.modal", function () {
  // When the map modal is hidden, show the post modal
  postModalChange();
});
function postModalChange() {
  const postModalInstance = new bootstrap.Modal(postModal);
  postModalInstance.show();
}
function mapMadalClicked() {
  mapModalInstance.hide();
  postModalChange();
}
// Function to open the map modal
function openMap() {
  mapModal.style.display = "block";
}

// Add any additional map configuration or markers here

function loadNearByPosts(longitude, latitude) {
  fetch(`/nearby/events?latitude=${latitude}&longitude=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the received posts and update the UI
      const posts = data.posts.posts;
      // Update the UI with the retrieved posts
      console.log(posts);
      let postsHTML = "";
      if (Array.isArray(posts))
        posts.forEach(function (post) {
          postsHTML += `
          <div class="card card-shadow mt-3">
            <div class="d-flex justify-content-between p-1 px-2">
              <div class="d-flex flex-row align-items-center">
                <img src="images/avatar.png" width="50" class="rounded-circle" />
                <div class="d-flex flex-column ms-2">
                  <span class="fw-bold fs-5">${post.user.name}</span>
                  <small>${post.user.address}</small><small>${timeSince(
            post.createdAt
          )}</small>
                </div>
              </div>
            </div>
            ${post.image ? `
            <img src="http://localhost:3000/post/images/${post.image}" class="img-fluid" height="435" width="580" tyle="margin: auto; />
            `:''}
            <div class="p-1">
              <span class="text-justify post-discription lead">${post.postDescription}</span>
              <hr />
              <div class="d-flex justify-content-between align-items-center ml-3">
                <button class="btn btn-primary" type="button">
                  <span> <i class="bi bi-hand-thumbs-up"></i></span> <span>Like</span>
                </button>
                <div class="d-flex flex-row muted-color">
                <span class="like-icon" ><i class="bi bi-hand-thumbs-up-fill" style="font-size: 20px; color: blue;"></i>
                ${
                  post.likesCount === 0
                    ? "Be First to like"
                      : `${post.likesCount}`
                }</span>
                  <span class="comment-icon" ><i class="bi bi-chat" style="font-size: 20px;"></i>  ${
                    post.commentCount === 0
                      ? "No comments"
                      : post.commentCount === 1
                        ? "1 comment"
                        : `${post.commentCount} comments`
                  }</span>
                </div>
              </div>
              <hr />
              <div class="comments" id="${post._id}">
              ${post.lastComment._id ? `
                <div class="d-flex flex-row mb-2" >
                  <img src="images/avatar.png" width="40" class="rounded-circle" />
                  <div class="d-flex flex-column ms-2">
                    <span class="fw-bold">${post.lastComment.user.name}</span>
                    <small class="comment-text">${post.lastComment.comment}</small>
                  </div>
                  ` : ''}
                </div>
                <div class="comment-input">
                  <input type="text" class="form-control" placeholder="Comment..." onkeyup="onComment('${post._id}','${data.name}',event)"/>
                </div>
              </div>
            </div>
          </div>
        `;
        });

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
