///////////////////////////////////////////////////////////////
// MODAL WINDOWS
///////////////////////////////////////////////////////////////

// Click event for portfolio images
$('.item-image').click(function () {
  // Traversing back to parent element and moving down to the second div where the modal id can be targeted
  var model_item_id = $(this).parents().children('div')[1].id;

  // // To Open Modal Window
  var myModal = new bootstrap.Modal($(String(`#${model_item_id}`)), {});
  myModal.show();

  // FOR REDIRECTING USER
  $('.btn-modal').click(function () {
    var item_name = $(this).attr('name');
    var item_link = String(`https://github.com/mmehr1988/${item_name}`);

    if ($(this).hasClass('msg-seller') === true) {
      // To Open Repo Page
      window.open(item_link, '_blank');
    }
  });

  // To Close Modal
  $('.btn-close').click(function () {
    myModal.hide();
  });
});
