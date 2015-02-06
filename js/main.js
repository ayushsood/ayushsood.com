setTimeout(function() {
  var $logo = $('#logo-center');

  $logo.fadeOut(200, function() {
    $logo.attr('id', 'logo');
    $logo.fadeIn(600);
  });
}, 1000);

setTimeout(function() {
  var $circle = $('#circle-container');
  $circle.fadeIn(600);
}, 1500);

// var $contact = $('#contact');
// $('#contact-link').click(function(e) {
//   $contact.fadeIn(1000);
// });

// $('#contact-back-link').click(function(e) {
//   $contact.fadeOut(500);
// });
