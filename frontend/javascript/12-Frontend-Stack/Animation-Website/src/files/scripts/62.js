$(function() {
  // Handle event for sub menu in header
  var $buttonMenu = $('.secondary-nav__item .fa-bars'),
      $subMenu = $('.tertiary-menu');

  $buttonMenu.mouseenter(function() {
    $subMenu.addClass('is-visible');
  });

  $buttonMenu.mouseleave(function() {
    $subMenu.removeClass('is-visible');
    $subMenu.mouseenter(function() {
      $subMenu.addClass('is-visible');
    });

    $subMenu.mouseleave(function() {
      $subMenu.removeClass('is-visible');
    });
  });

  // Handle event for animation in home page
  var wScreen = $(window).width(),
      hScreen = $(window).height(),
      wScreenHalf = wScreen / 2,
      women_scale, women_opacity,
      men_scale, man_opacity, 
      tmp_scale, tmp_reverse_scale, tmp_opacity, tmp_reverse_opacity,
      wMenuImage = $('.home-menu__item--women .home-menu__image').width(),
      $women = $('.home-menu__item--women'),
      $men = $('.home-menu__item--men');

  $('.home-menu__item').width(wScreen/2);
  $('.home-menu__item').height(hScreen);

  $(document).on('mousemove', function(event) {
    var x = event.pageX;
    tmp_opacity = tmp_scale = (((0.47 * wMenuImage + 20 * wScreen) * (x + 200) + 290 * wScreen - 2 * wMenuImage) / (14 * wScreen * wScreen + 2 * wScreen * wMenuImage - 2 * wMenuImage + 3 * wScreen));

    // Handle for image menu
    if(x < (wScreenHalf - 10 - wMenuImage)) {
      $women.addClass('on-focus-left');
      $men.addClass('on-focus-left');
      checkClassAndRemove($women, 'on-focus-right');
      checkClassAndRemove($men, 'on-focus-right');
    } 

    else if ((x > (wScreenHalf - 10 - wMenuImage)) && x < ((wScreenHalf + 10 + wMenuImage))) {
      checkClassAndRemove($women, 'on-focus-left');
      checkClassAndRemove($men, 'on-focus-left');
      checkClassAndRemove($women, 'on-focus-right');
      checkClassAndRemove($men, 'on-focus-right');

      men_scale     = tmp_scale;
      women_scale   = 1.7 - men_scale;
      men_opacity   = tmp_opacity;
      women_opacity = 1.6 - men_opacity;

      menuAnimation($women, women_scale, 70, women_opacity);
      menuAnimation($men, men_scale, -70, men_opacity);
    } 

    else if (x > (wScreenHalf + 10 + wMenuImage)){
      $women.addClass('on-focus-right');
      $men.addClass('on-focus-right');
      checkClassAndRemove($women, 'on-focus-left');
      checkClassAndRemove($men, 'on-focus-left');
    }

    // Handle for text menu
    if(x < (wScreenHalf - wMenuImage/4)) {
      $women.addClass('show-menu');
      checkClassAndRemove($men, 'show-menu');
    } 

    else if ((x > (wScreenHalf - wMenuImage/4)) && (x < (wScreenHalf + wMenuImage/4))) {
      checkClassAndRemove($women, 'show-menu');
      checkClassAndRemove($men, 'show-menu');
    } 

    else {
      $men.addClass('show-menu');
      checkClassAndRemove($women, 'show-menu');
    }

    //function add style for $men and $women
    function menuAnimation(selector, scale, translateX, opacity) {
      selector.css({
        'transform': 'scale('+scale+') translateX('+translateX+'px)',
        '-moz-transform': 'scale('+scale+') translateX('+translateX+'px)',
        '-webkit-transform': 'scale('+scale+') translateX('+translateX+'px)',
        'opacity': opacity
      });
    }

    function checkClassAndRemove(selector, class_rm) {
      if(selector.hasClass(class_rm)) {
        selector.removeClass(class_rm);
      }
    }
  });
});