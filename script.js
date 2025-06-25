document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const toggleIcon = togglePassword.querySelector("i");
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");
  const criteria = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special"),
  };

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    toggleIcon.classList.toggle("fa-eye", type === "password");
    toggleIcon.classList.toggle("fa-eye-slash", type !== "password");
  });

  // Check password strength
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let strength = 0;

    // Check criteria
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Update criteria list
    for (const [key, value] of Object.entries(checks)) {
      criteria[key].classList.toggle("valid", value);
      if (value) strength += 20;
    }

    // Update strength bar and text
    strengthBar.style.width = `${strength}%`;
    if (strength === 0) {
      strengthBar.style.backgroundColor = "#e74c3c";
      strengthText.textContent = "Enter a password to check its strength.";
    } else if (strength <= 40) {
      strengthBar.style.backgroundColor = "#e74c3c";
      strengthText.textContent = "Weak";
    } else if (strength <= 60) {
      strengthBar.style.backgroundColor = "#f39c12";
      strengthText.textContent = "Fair";
    } else if (strength <= 80) {
      strengthBar.style.backgroundColor = "#3498db";
      strengthText.textContent = "Good";
    } else {
      strengthBar.style.backgroundColor = "#2ecc71";
      strengthText.textContent = "Strong";
    }
  });
});
