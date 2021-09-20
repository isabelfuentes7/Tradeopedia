'use strict';

const logoutBtn = document.querySelector('#logout-button');

/////////////////////////////////////////////////////////////////
// LOGOUT USER
/////////////////////////////////////////////////////////////////
const logoutUser = async (event) => {
  event.preventDefault();
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch('/api/users/logout', options);

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

logoutBtn.addEventListener('click', logoutUser);
