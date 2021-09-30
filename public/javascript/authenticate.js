'use strict';

/////////////////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////////////////

// SignUp
const build_store_btn = document.querySelector('#build-store-button');
const signupBtn = document.querySelector('#signup-button');
const userSignupCheck = document.querySelector('.signup-check');

// Login
const login_btn = document.querySelector('#login-button');
const signInBtn = document.querySelector('#signin-button');
const userLoginCheck = document.querySelector('.login-check');

// // Logout
const logout_btn = document.querySelector('#logout-button');

/////////////////////////////////////////////////////////////////
// TIMEOUT MESSAGE
/////////////////////////////////////////////////////////////////

const hideMessage = async (data) => {
  setTimeout(function () {
    if (data === 'signup') {
      userSignupCheck.innerHTML = '';
    } else if (data === 'login') {
      userLoginCheck.innerHTML = '';
    }
  }, 1500);
};

const showMessage = async (data, message) => {
  if (data === 'signup') {
    userSignupCheck.innerHTML = message;
    hideMessage('signup');
  } else if (data === 'login') {
    userLoginCheck.innerHTML = message;
    hideMessage('login');
  }
};

/////////////////////////////////////////////////////////////////
// GET ALL USERS
/////////////////////////////////////////////////////////////////
const getAllUsers = async () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('/home/users/all', options);
  const data = await response.json();
  return data;
};

/////////////////////////////////////////////////////////////////
// CREATE USER
/////////////////////////////////////////////////////////////////
const createUser = async (first_name, last_name, username, email, password, country, state, city) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name, last_name, username, email, password, country, state, city }),
  };
  const response = await fetch('/home/users/create', options);

  if (response.ok) {
    loginUser(email, password);
  } else {
    alert(response.statusText);
  }
};

/////////////////////////////////////////////////////////////////
// FETCH | POST | LOGIN
/////////////////////////////////////////////////////////////////
const loginUser = async (email, password, username) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch('/home/users/login', options);

  if (response.ok) {
    document.location.replace('/view/user/explore');
  } else {
    showMessage('login', 'Password Incorrect');
  }
};

/////////////////////////////////////////////////////////////////
// FETCH | POST | LOGOUT
/////////////////////////////////////////////////////////////////

const logoutUser = async (event) => {
  event.preventDefault();

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch('/home/users/logout', options);

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

/////////////////////////////////////////////////////////////////
// SIGN UP USER
/////////////////////////////////////////////////////////////////

const signupFormHandler = async (event) => {
  event.preventDefault();
  const first_name = document.querySelector('#signup-first-name').value.trim();
  const last_name = document.querySelector('#signup-last-name').value.trim();
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const country = document.querySelector('#signup_country').value;
  const state = document.querySelector('#signup_state').value;
  const city = document.querySelector('#signup_city').value;

  const findAllUsers = await getAllUsers();
  const checkEmail = await findAllUsers.find((el) => el.email === email);
  const checkUsername = await findAllUsers.find((el) => el.username === username);

  if (first_name === '' || last_name === '' || email === '' || username === '' || password === '' || country === '' || state === '' || city === '') {
    // [1] CHECK ALL FIELDS ARE POPULATED
    showMessage('signup', 'Please fill out all fields.');
  } else if (!checkEmail && checkUsername) {
    // [2] IF USERNAME ALREADY EXISTS
    showMessage('signup', `Username ${username} already exist.`);
  } else if (checkEmail && !checkUsername) {
    // [3] IF EMAIL ALREADY EXISTS
    showMessage('signup', `Email ${email} already exist.`);
  } else if (checkEmail && checkUsername) {
    // [4] IF BOTH EMAIL & USERNAME EXIST
    showMessage('signup', `Email ${email} & Username ${username} already exist.`);
  } else {
    // [5] CREATE USER AND LOG THEM IN
    await createUser(first_name, last_name, username, email, password, country, state, city);
  }
};

/////////////////////////////////////////////////////////////////
// LOGIN USER
/////////////////////////////////////////////////////////////////

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  // [1] CHECK EMAIL EXISTS
  const findAllUsers = await getAllUsers();

  const checkUserExists = findAllUsers.find((el) => el.email === email);
  // [2] ATTEMPT TO LOG USER IN
  if (email === '' || password === '') {
    // [3] CHECK ALL FIELDS ARE POPULATED
    showMessage('login', 'Please fill out all fields.');
  } else if (!checkUserExists) {
    // [4] IF USER IS NOT SIGNED UP
    showMessage('login', `${email} does not exist. Please check again.`);
  } else {
    // [4] ATTEMPT TO LOGIN USER
    await loginUser(email, password, checkUserExists.username);
  }
};

/////////////////////////////////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////////////////////////////////

if (window.location.pathname === '/' || window.location.pathname.includes('/home/')) {
  signInBtn.addEventListener('click', loginFormHandler);
  document.addEventListener('keyup', function (event) {
    return event.key === 'Enter' ? signInBtn.click() : '';
  });
  signupBtn.addEventListener('click', signupFormHandler);
  document.addEventListener('keyup', function (event) {
    return event.key === 'Enter' ? signupBtn.click() : '';
  });
} else if (window.location.pathname !== '/') {
  logout_btn.addEventListener('click', logoutUser);
}
