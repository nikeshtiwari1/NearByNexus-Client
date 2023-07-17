document.addEventListener('DOMContentLoaded', function () {
    // Get references to the image input, image preview elements, and close icon
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.querySelector('.image-preview-container');
    const imagePreview = document.getElementById('imagePreview');
    const closeIcon = document.getElementById('closeIcon');
    const imageInputLabel = document.getElementById('imageInputLabel');

    // Function to reset the image preview and input
    function resetImagePreview() {
      imageInput.value = ''; // Empty the input value
      imagePreview.src = '#'; // Reset the image preview src
      imagePreview.style.display = 'none'; // Hide the image preview
      closeIcon.style.display = 'none'; // Hide the close icon
      imageInputLabel.style.display = 'block'; // Show the label
    }

    // Listen for changes in the image input
    imageInput.addEventListener('change', function () {
      const file = imageInput.files[0];
      if (file) {
        // Create a FileReader to read the selected image
        const reader = new FileReader();

        // Set up the FileReader onload event
        reader.onload = function (e) {
          // Update the image preview src with the selected image data URL
          imagePreview.src = e.target.result;
          // Show the image preview and close icon
          imagePreviewContainer.style.display = 'block';
          imagePreview.style.display = 'block';
          closeIcon.style.display = 'block';
          imageInputLabel.style.display = 'none'; // Hide the label

        };

        // Read the selected image as a data URL
        reader.readAsDataURL(file);
      } else {
        // If no image is selected, hide the image preview and close icon
        imagePreview.style.display = 'none';
        closeIcon.style.display = 'none';
        imagePreviewContainer.style.display = 'none';

      }
    });

    // Listen for the close icon click event
    closeIcon.addEventListener('click', function () {
      // Reset the image preview and input
      resetImagePreview();
    });
  });

  // Function to handle the keyup event for comment inputs
function onComment(postId,name, event) {
    if (event.key === 'Enter') {
      const textBox = event.target;
      const comment = textBox.value;
      console.log('Comment submitted for post with ID', postId, ':', comment);
  
         // Send the POST request with fetch
         fetch('/post/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId, comment: comment }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the API response
              console.log('API response:', data);
  
              // Clear the input field after posting the comment
              populateComment(postId,name,comment);
              textBox.value = '';
            })
            .catch((error) => {
              // Handle API error
              console.error('API error:', error);
            });
        

      // Clear the text box after submission
    }
  }

  function populateComment(postId,name, comment) {
    const commentSection = document.getElementById(postId);
    const commentElement = document.createElement('div');
    commentElement.classList.add('d-flex', 'flex-row', 'mb-2');
  
    const avatarImage = document.createElement('img');
    avatarImage.src = 'images/avatar.png';
    avatarImage.width = '40';
    avatarImage.classList.add('rounded-circle');
  
    const commentContent = document.createElement('div');
    commentContent.classList.add('d-flex', 'flex-column', 'ms-2');
  
    const userName = document.createElement('span');
    userName.classList.add('fw-bold');
    userName.textContent = name; // Replace this with the actual user name
  
    const commentText = document.createElement('small');
    commentText.classList.add('comment-text');
    commentText.textContent = comment;
  
    commentContent.appendChild(userName);
    commentContent.appendChild(commentText);
  
    commentElement.appendChild(avatarImage);
    commentElement.appendChild(commentContent);
  
    // Get the input comment field
    const inputComment = commentSection.querySelector('.comment-input');
  
    // Insert the new comment element before the input comment field
    commentSection.insertBefore(commentElement, inputComment);
  }
  
  