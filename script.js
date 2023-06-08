// Signup and login form validation and local storage
const signupContainer = document.getElementById('signupContainer');
const loginContainer = document.getElementById('loginContainer');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const signupAge = document.getElementById('signupAge');
const signupBirthday = document.getElementById('signupBirthday');
const termsAndConditions = document.getElementById('termsAndConditions');
const clearButton = document.getElementById('clearButton');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

// Function to toggle between signup and login forms
function toggleForms() {
  signupContainer.style.display = (signupContainer.style.display === 'none') ? 'block' : 'none';
  loginContainer.style.display = (loginContainer.style.display === 'none') ? 'block' : 'none';
  document.getElementById('formTitle').textContent = (signupContainer.style.display === 'none') ? 'Login' : 'Signup';
}

// Event listener for the switch button (to signup form)
document.getElementById('switchToSignup').addEventListener('click', function () {
  toggleForms();
});

// Event listener for the switch button (to login form)
document.getElementById('switchToLogin').addEventListener('click', function () {
  toggleForms();
});

// Event listener for the clear button
document.getElementById('clearButton').addEventListener('click', function () {
  // Clear form fields
  signupName.value = '';
  signupEmail.value = '';
  signupPassword.value = '';
  confirmPassword.value = '';
  signupAge.value = '';
  signupBirthday.value = '';
  termsAndConditions.checked = false;
});

// Prevent form submission for now
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate password confirmation
  if (signupPassword.value !== confirmPassword.value) {
    alert("Password and Confirm Password do not match");
    return;
  }

  const name = signupName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const age = signupAge.value;
  const birthday = signupBirthday.value;

  // Remove error class from all labels
  const labels = document.getElementsByTagName('label');
  for (let i = 0; i < labels.length; i++) {
    labels[i].classList.remove('error');
  }

  if (name === '') {
    signupName.classList.add('error');
    document.querySelector('label[for="signupName"]').classList.add('error');
  }

  if (email === '') {
    signupEmail.classList.add('error');
    document.querySelector('label[for="signupEmail"]').classList.add('error');
  }

  if (password === '') {
    signupPassword.classList.add('error');
    document.querySelector('label[for="signupPassword"]').classList.add('error');
  }

  if (age === '') {
    signupAge.classList.add('error');
    document.querySelector('label[for="signupAge"]').classList.add('error');
  }

  if (birthday === '') {
    signupBirthday.classList.add('error');
    document.querySelector('label[for="signupBirthday"]').classList.add('error');
  }

  if (!termsAndConditions.checked) {
    alert('Please agree to the Terms and Conditions');
    return;
  }

  // Store user data in local storage
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('age', age);
  localStorage.setItem('birthday', birthday);

  alert('Signup successful');
  window.location.href = 'home.html';
});

// Check if login details should be remembered
if (localStorage.getItem('rememberLogin')) {
  document.getElementById('rememberMe').checked = true;
  const storedLoginEmail = localStorage.getItem('loginEmail');
  const storedLoginPassword = localStorage.getItem('loginPassword');
  loginEmail.value = storedLoginEmail;
  loginPassword.value = storedLoginPassword;
}

// Event listener for the rememberMe checkbox
document.getElementById('rememberMe').addEventListener('change', function () {
  if (this.checked) {
    const email = loginEmail.value;
    const password = loginPassword.value;
    localStorage.setItem('rememberLogin', true);
    localStorage.setItem('loginEmail', email);
    localStorage.setItem('loginPassword', password);
  } else {
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginPassword');
  }
});

// Event listener for the login form submission
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  if (email === storedEmail && password === storedPassword) {
    alert('Login successful');
    window.location.href = 'home.html';
    // Redirect to the desired page or perform other actions after successful login
  } else {
    alert('Invalid email or password');
  }
});
