///////////////////////////////////////////////////////////////
// MODAL WINDOWS | LOGIN & SIGNUP
///////////////////////////////////////////////////////////////

// Click event for portfolio images
$('#login-button,#build-store-button').click(function (e) {
  // Traversing back to parent element and moving down to the second div where the modal id can be targeted
  var model_item_id = $(this).parents().children('div')[0].id;

  // To Open Modal Window
  var myModal = new bootstrap.Modal($(String(`#${model_item_id}`)), {});
  myModal.show();

  // To Close Modal
  $('.btn-close').click(function () {
    myModal.hide();
  });
});
