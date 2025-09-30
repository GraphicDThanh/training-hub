$(function() {
  setTimeout(function() {
    $('body').addClass('loading');
    $('body').height($(window).height());
  }, 5000);

  // initialization for slider
  $('.slider').slider({
    full_width: true,
    height: $(window).height()
  });

  // initialization for parallax
  $('.parallax').parallax();
});