window.onload = function () {
   

const imageUpload = document.getElementById('imageUpload');
  const imagePreview = document.getElementById('imagePreview');

  // Add event listener to file input
  imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('image', file);

      // Use fetch or your preferred method to upload the image to the server
      try {
        const response = await fetch('/uploadProfileImage', {
          method: 'POST',
          body: formData,
        });

        // Assuming the server responds with a JSON object containing the image URL
        const data = await response.json();
        const imageUrl = data.userDetails.data.detail.imageUrl;

        // Update the image preview with the uploaded image
       location.reload();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  });
};