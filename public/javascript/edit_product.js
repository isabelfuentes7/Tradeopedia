'use strict';

/////////////////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////////////////

const editBtnClicked = document.querySelectorAll('button');

/////////////////////////////////////////////////////////////////
// UPDATE PRODUCT
/////////////////////////////////////////////////////////////////
const updateProduct = async (id, product_name, product_price, product_description, category_name) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, product_name, product_price, product_description, category_name }),
  };
  const response = await fetch(`/update/product/:${id}`, options);

  if (response.ok) {
    document.location.replace('/view/user/products');
  } else {
    alert(response.statusText);
  }
};

/////////////////////////////////////////////////////////////////////
// DETELE POST
/////////////////////////////////////////////////////////////////////

const deleteProduct = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };
  const response = await fetch(`/update/product/:${id}`, options);

  if (response.ok) {
    document.location.replace('/view/user/products');
  } else {
    alert(response.statusText);
  }
};

/////////////////////////////////////////////////////////////////////
// LOOP FOR WHICH EDIT BUTTON CLICKED
/////////////////////////////////////////////////////////////////////
if (window.location.pathname.includes('/view/user/edit-product/')) {
  for (let i = 0; i < editBtnClicked.length; i++) {
    editBtnClicked[i].addEventListener('click', function (event) {
      const id = window.location.pathname.split('/').pop();
      const product_name = $('#product_name').val();
      const product_price = $('#product_price').val();
      const product_description = $('#product_description').val();
      const category_name = $('#product_category option:selected').text();

      if (editBtnClicked[i].id === 'save-product-button' && category_name === 'Choose...') {
        alert('Please choose category');
      } else if (editBtnClicked[i].id === 'save-product-button' && category_name !== 'Choose...') {
        updateProduct(id, product_name, product_price, product_description, category_name);
      } else if (editBtnClicked[i].id === 'delete-product-button') {
        deleteProduct(id);
      }
    });
  }
}
