'use strict';

/////////////////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////////////////

// Update Profile
const save_profile_btn = document.querySelector('#save-profile-button');
const profile_img_url = document.querySelector('#profile_img_url');

/////////////////////////////////////////////////////////////////
// UPDATE USER PROFILE
/////////////////////////////////////////////////////////////////

if (window.location.pathname === '/view/user/profile') {
  profile_img_url.addEventListener('change', function () {
    const form = new FormData();
    form.append('profile_img_url', document.querySelector('#profile_img_url').files[0]);

    const profileUpdateHandler = async (event) => {
      event.preventDefault();

      const options = {
        method: 'PUT',
        body: form,
      };

      const response = await fetch('/update/profile', options);

      if (response.ok) {
        document.location.replace('/view/user/profile');
      } else if (!response.ok) {
        console.log(await response.json());
      }
    };

    save_profile_btn.addEventListener('click', profileUpdateHandler);
  });
}
