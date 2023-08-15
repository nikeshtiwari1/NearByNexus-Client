document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const postForm = document.getElementById("loginForm"); // Replace with your form's actual ID
  
    const validateEmail = () => {
      if (emailInput.value.trim() === "") {
        emailInput.classList.add("is-invalid");
        return false;
      } else {
        emailInput.classList.remove("is-invalid");
        return true;
      }
    };
  
    const validatePassword = () => {
      if (passwordInput.value.trim() === "") {
        passwordInput.classList.add("is-invalid");
        return false;
      } else {
        passwordInput.classList.remove("is-invalid");
        return true;
      }
    };
  
    postForm.addEventListener("submit", function (event) {
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
  
      if (!isEmailValid || !isPasswordValid) {
        event.preventDefault(); // Prevent form submission
      }
    });
  });
  