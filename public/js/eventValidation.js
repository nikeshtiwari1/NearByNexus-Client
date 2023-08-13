document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    const postDescriptionInput = document.getElementById("postDescription");
    const postDescriptionError = document.getElementById("postDescriptionError");

    postForm.addEventListener("submit", function (event) {
        if (postDescriptionInput.value.trim() === "") {
            event.preventDefault();
            postDescriptionInput.classList.add("is-invalid");
            postDescriptionError.style.display = "block";
        }
    });

    postDescriptionInput.addEventListener("input", function () {
        if (postDescriptionInput.value.trim() !== "") {
            postDescriptionInput.classList.remove("is-invalid");
            postDescriptionError.style.display = "none";
        }
    });
});
