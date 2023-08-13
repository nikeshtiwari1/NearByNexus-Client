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
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locLatitude = latitude;
      locLongitude = longitude;
      loadNearByPosts(longitude, latitude);
      document.getElementById("latitude").value = latitude;
      document.getElementById("longitude").value = longitude;
      document.getElementById("eventlatitude").value = latitude;
      document.getElementById("eventlongitude").value = longitude;

      getAddress(longitude, latitude);

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
        document.getElementById("eventlatitude").value = markerPosition.lat();
        document.getElementById("eventlongitude").value = markerPosition.lng();
        getAddress(markerPosition.lng(), markerPosition.lat());

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
const eventModal = document.getElementById("eventFormModal");

// Show the map modal initially
const mapModalInstance = new bootstrap.Modal(mapModal);
const eventModalInstance = new bootstrap.Modal(eventModal);
const postModalInstance = new bootstrap.Modal(postModal);

// Listen for the hidden.bs.modal event on the map modal
mapModal.addEventListener("hidden.bs.modal", function () {
  // Determine which modal to show based on the data-modal-source attribute
  const source = openMapButton.getAttribute("data-modal-source");
  if (source === "postModal") {
    postModalInstance.show();
  } else if (source === "eventFormModal") {
    eventModalInstance.show();
  }
});

function postModalChange() {
  postModalInstance.show();
}
function mapMadalClicked() {
  mapModalInstance.hide();
  const source = openMapButton.getAttribute("data-modal-source");
  if (source === "postModal") {
    postModalInstance.show();
  } else if (source === "eventFormModal") {
    eventModalInstance.show();
  }
}
// Function to open the map modal
function openMap(eventSource) {
  mapModal.style.display = "block";
  openMapButton.setAttribute("data-modal-source", eventSource);
}

async function getAddress(longitude, latitude) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCUHZoJXyaMM-1c4c5GpfC2YCtzSdjJLU8`;

  try {
    // Make a request to the Google Geocoding API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the API response is successful and contains results
    if (data.status === "OK" && data.results.length > 0) {
      // Get the formatted address from the first result
      const addressComponents = data.results[0].address_components;

      let streetNumber = "";
      let streetName = "";
      let city = "";
      let zipcode = "";

      // Loop through address components and extract required parts
      for (const component of addressComponents) {
        if (component.types.includes("street_number")) {
          streetNumber = component.long_name;
        } else if (component.types.includes("route")) {
          streetName = component.long_name;
        } else if (component.types.includes("locality")) {
          city = component.long_name;
        } else if (component.types.includes("postal_code")) {
          zipcode = component.long_name;
        }
      }
      const standardAddress = `${streetNumber} ${streetName}, ${city}, ${zipcode}`;
      document.getElementById("postLocation").value = standardAddress;
      document.getElementById("eventLocation").value =standardAddress;
      // Now you can use the standard address in your code
      console.log("Standard Address:", standardAddress);
    } else {
      console.log("Geocoding request failed or no results found.");
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
  }
}

// Add any additional map configuration or markers here

function loadNearByPosts(longitude, latitude) {
  fetch(`/nearby/events?latitude=${latitude}&longitude=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the received posts and update the UI
      const posts = data.posts.posts;
      // Update the UI with the retrieved posts
      let postsHTML = "";
      if (Array.isArray(posts))
        posts.forEach(function (post) {
          const imageUrl = post.user.imageUrl
            ? `https://api-nearbunexus.onrender.com/post/images/${post.user.imageUrl}`
            : "/images/avatar.png";
          postsHTML += `
          <div class="card card-shadow mt-3 mb-3">
            <div class="d-flex justify-content-between p-1 px-2">
              <div class="d-flex flex-row align-items-center">
              
                <img src="${imageUrl}" width="50" height= "50" class="rounded-circle" alt="Profile image of ${
            post.user.name
          }  who posted this event."/>
                <div class="d-flex flex-column ms-2">
                  <span class="fw-bold fs-5 post-name mb-1  mb-md-0">${
                    post.user.name
                  }</span>
                  <small class="address-time event  d-md-block">${
                    post.user.address ? post.user.address : ""
                  } • ${timeSince(post.createdAt)} •</small>
                </div>
              </div>
            </div>
            <span   aria-label="Click to view post details"  tabindex="0"
            class="text-justify post-discription lead pointer" onclick="handleNotificationClick('${
              post._id
            }')">${post.postDescription}</span>
            ${
              post.image
                ? `
            <img src="https://api-nearbunexus.onrender.com/post/images/${post.image}" alt ="${post.user.name} post" class="img-fluid mb-1 pointer mt-1" height="435" width="580" style="margin: auto;" aria-label="Click to view post details"  tabindex="0" onclick="handleNotificationClick('${post._id}')"/>
          `
                : ""
            }

            ${post.postType == 'Event'? `
            <div class="event-detail lead mt-3">
            <div class="event-date">
            <span class="date-text">${formatToCustomDate(post.startDate)}</span> ${post.endDate ? `- <span class="date-text">${formatToCustomDate(post.endDate)}</span>`:""}
            </div>
            <h2 class="event-title">${post.title}</h2>
            <div class="event-location"><i class="bi bi-geo-alt text-secondary "></i>${post.locationName}</div>
            <button class="btn btn-primary event-interested mt-4" type="button" id="interested-${post._id}">Interested?</button>
            </div>
            
            `:""}
            <div class="p-1">
             
                <div class=" d-flex flex-row justify-content-end muted-color mt-2">
                <span class="like-icon" id="likeIcon-${post._id}">
                ${
                  post.likesCount === 0
                    ? `<button class="btn heart-button" type="button" data-post-id="${post._id}" onclick="toggleLike('${post._id}')"><i class="bi bi-heart" style="font-size: 20px ; font-weight: bold; color: red;"></i>  <span class="visually-hidden">Like</span>
                    </button> Be First to like`
                    : `<button class="btn heart-button" type="button" data-post-id="${
                        post._id
                      }" onclick="toggleLike('${post._id}')">
                        <i class="bi ${
                          post.userHasLiked ? "bi-heart-fill" : "bi-heart"
                        }" style="font-size: 20px; color: red;"></i>
                        <span class="visually-hidden">Like</span> </button> ${
                          post.likesCount
                        }`
                }
                
              </span>
                  <span class="comment-icon" role="button"  tabindex="0" onkeydown="handleCommentIconKeydown('${
                    post._id
                  }')" onclick="moveFocusToCommentInput('${
                    post._id
                  }')"><i class="bi bi-chat font-weight-bold" style="font-size: 20px;"></i>  ${
            post.commentCount === 0
              ? "No comments"
              : post.commentCount === 1
              ? "1 comment"
              : `${post.commentCount} comments`
          }</span>
               
              </div>
              <hr />
              <div class="comments" id="${post._id}">
              ${
                post.lastComment._id
                  ? `
                <div class="d-flex flex-row mb-2" >
                <img src="${
                  post.lastComment.user.imageUrl
                    ? `https://api-nearbunexus.onrender.com/post/images/${post.lastComment.user.imageUrl}`
                    : "images/avatar.png"
                }" alt ="Profile image of ${
                      post.lastComment.user
                    } ho has passed in the comment." width="40"  height="40" class="rounded-circle" />
                <div class="d-flex flex-column ms-2">
                    <span class="fw-bold comment-name">${
                      post.lastComment.user.name
                    }  <small class="comment-address-time">${
                      post.lastComment.user.address
                        ? post.lastComment.user.address
                        : ""
                    } • ${timeSince(
                      post.lastComment.createdAt
                    )} •</small></span>
                    <small class="comment-text">${
                      post.lastComment.comment
                    }</small>
                  </div>
                  
                  `
                  : ""
              }
                </div>
                ${post.lastComment._id ? `<hr />` : ""}
                
                <div class="comment-input d-flex align-items-center">
                <img src="${
                  data.posts.currentUserImage
                    ? `https://api-nearbunexus.onrender.com/post/images/${data.posts.currentUserImage}`
                    : "images/avatar.png"
                }" alt='Profile image of ${
            data.name
          } posting a comment.' width="40" height="40" class="rounded-circle" />
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
          }')"  onkeypress="handleKeyPress(event, '${post._id}', '${
            data.name
          }', '${data.posts.currentUserImage}', '${
            data.posts.currentUserAddress
          }')"/>
            
                </div>
                <div class="comment-button-container" id="commentButtonContainer-${
                  post._id
                }" style="display: none;"></div>

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

function formatToCustomDate(inputDate) {
  const date = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };

  return date.toLocaleString("en-US", options);
}