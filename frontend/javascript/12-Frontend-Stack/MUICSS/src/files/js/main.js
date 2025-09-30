$(function() {
  $('#btn-scroll-top').on('click', function() {
    console.log('click');
    $('html, body').animate({scrollTop: 0}, 800);
  });
});