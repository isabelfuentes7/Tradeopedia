'use strict';

/////////////////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////////////////

const uploadBtn = document.querySelector('#upload-product-button');
const productCreateCheck = document.querySelector('.productCreateCheck');

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
  const response = await fetch('/dashboard/create/', options);

  if (response.ok) {
    alert('Product successfully created!');
  } else {
    alert(response.statusText);
  }
};

/////////////////////////////////////////////////////////////////
// FORM HANDLER
/////////////////////////////////////////////////////////////////
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
    // [5] CREATE PRODUCT
    await createProduct(product_name, product_price, product_description, category_name);
  }
};

if (window.location.pathname === '/dashboard/create/') {
  uploadBtn.addEventListener('click', productFormHandler);
}
