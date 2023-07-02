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
function postModalChange(){
    const postModalInstance = new bootstrap.Modal(postModal);
    postModalInstance.show();
}
function mapMadalClicked(){
    mapModalInstance.hide();
    postModalChange();
}
// Function to open the map modal
function openMap() {
  mapModal.style.display = "block";
}

// Add any additional map configuration or markers here
