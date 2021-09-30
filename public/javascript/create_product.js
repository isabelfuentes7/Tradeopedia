'use strict';

/////////////////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////////////////

const uploadBtn = document.querySelector('#upload-product-button');
const productCreateCheck = document.querySelector('.productCreateCheck');
const product_img_url = document.querySelector('#product_img_url');

/////////////////////////////////////////////////////////////////
// TIMEOUT MESSAGE
/////////////////////////////////////////////////////////////////

const hideProductCheck = async () => {
  setTimeout(function () {
    productCreateCheck.innerHTML = '';
  }, 1500);
};

const showProductCheck = async (message) => {
  productCreateCheck.innerHTML = message;
  hideProductCheck();
};

/////////////////////////////////////////////////////////////////
// CREATE PRODUCT
/////////////////////////////////////////////////////////////////
const createProduct = async (product_name, product_price, product_description, category_name) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_name, product_price, product_description, category_name }),
  };
  const response = await fetch('/create/product', options);

  if (response.ok) {
    return await response.json();
  } else {
    alert(response.statusText);
  }
};

/////////////////////////////////////////////////////////////////
// CREATE IMAGE
/////////////////////////////////////////////////////////////////

const uploadProductImg = async (form) => {
  const options = {
    method: 'POST',
    body: form,
  };

  const response = await fetch('/create/product-image', options);

  if (response.ok) {
    // [6] ONCE PRODUCT IMAGE SUCCESSFULLY SAVED
    document.location.replace('/view/user/products');
  } else if (!response.ok) {
    console.log(await response.json());
  }
};

/////////////////////////////////////////////////////////////////
// FORM HANDLER
/////////////////////////////////////////////////////////////////

if (window.location.pathname === '/view/user/create') {
  product_img_url.addEventListener('change', function (event) {
    event.preventDefault();
    const form = new FormData();

    const productFormHandler = async (event) => {
      event.preventDefault();
      const product_name = document.querySelector('#product_name').value.trim();
      const product_price = document.querySelector('#product_price').value;
      const product_description = document.querySelector('#product_description').value.trim();
      const category_name = document.querySelector('#product_category').value.trim();

      if (product_name === '' || product_price === '' || product_description === '' || category_name === '') {
        // [1] CHECK ALL FIELDS ARE POPULATED
        showProductCheck('Please fill out all fields.');
      } else {
        // [2] CREATE PRODUCT WITH A FETCH POST
        const productCreate = await createProduct(product_name, product_price, product_description, category_name);

        // [3] USE THE PRODUCT ID TO APPEND TO THE IMAGE FORM
        const product_id = productCreate.id;

        form.append('product_id', product_id);
        form.append('product_img_url', product_img_url.files[0]);

        // [4] CREATE PRODUCT IMAGE WITH A FETCH POST
        await uploadProductImg(form);
      }
    };

    uploadBtn.addEventListener('click', productFormHandler);
  });
}
