document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const dateOfBirthInput = document.getElementById("dateOfBirth");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerForm = document.getElementById("registerForm");

    const validateField = (field, errorMessage) => {
      const fieldValue = field.value.trim();
      if (fieldValue === "") {
        field.classList.add("is-invalid");
        field.nextElementSibling.textContent = errorMessage;
        return false;
      } else {
        field.classList.remove("is-invalid");
        field.nextElementSibling.textContent = "";
        return true;
      }
    };

    registerForm.addEventListener("submit", function (event) {
      const isNameValid = validateField(nameInput, "Name is required.");
      const isEmailValid = validateField(emailInput, "Email is required.");
      const isPhoneNumberValid = validateField(phoneNumberInput, "Phone number is required.");
      const isDateOfBirthValid = validateField(dateOfBirthInput, "Date of birth is required.");
      const isPasswordValid = validateField(passwordInput, "Password is required.");
      const isConfirmPasswordValid = validateField(confirmPasswordInput, "Confirm password is required.");

      if (!isNameValid || !isEmailValid || !isPhoneNumberValid || !isDateOfBirthValid || !isPasswordValid || !isConfirmPasswordValid) {
        event.preventDefault(); // Prevent form submission
      }
    });
  });