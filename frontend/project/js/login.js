// Select elements
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const submitButton = document.getElementById("submit");

// Mode switching logic
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Validation logic
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return toggleValidation(emailInput, emailRegex.test(emailInput.value));
};

const validatePassword = () => {
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  return toggleValidation(passwordInput, passwordRegex.test(passwordInput.value));
};

const validateConfirmPassword = () => {
  const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
  return toggleValidation(confirmPasswordInput, passwordsMatch);
};

const toggleValidation = (input, isValid) => {
  const parent = input.parentElement;
  if (isValid) {
    parent.classList.add("valid");
    parent.classList.remove("invalid");
  } else {
    parent.classList.add("invalid");
    parent.classList.remove("valid");
  }
  return isValid;
};

// Add event listeners for real-time validation
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

// Password visibility toggling
const togglePasswordVisibility = (input, toggleIcon) => {
  if (input.type === "password") {
    input.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
};

togglePassword.addEventListener("click", () =>
  togglePasswordVisibility(passwordInput, togglePassword)
);

toggleConfirmPassword.addEventListener("click", () =>
  togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword)
);

// Form submission handling
submitButton.addEventListener("click", (event) => {
  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  // Check if all fields are valid
  if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    // Redirect to OTP verification page
    window.location.href = "./otpverify.html";
  } else {
    // Prevent default action and show alert
    event.preventDefault();
    alert("Please fill all fields correctly before proceeding.");
  }
});
