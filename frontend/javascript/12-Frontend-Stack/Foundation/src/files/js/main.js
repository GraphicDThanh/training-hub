// Setup for orbit
$(document).foundation({
  orbit: {
    animation: 'fade', // Sets the type of animation used for transitioning between slides, can also be 'fade'
    timer_speed: 2500, // Sets the amount of time in milliseconds before transitioning a slide
    pause_on_hover: false, // Pauses on the current slide while hovering
    next_on_click: false, // Advance to next slide on click
    animation_speed: 1000, // Sets the amount of time in milliseconds the transition between slides will last
    navigation_arrows: false,
    slide_number: false,
    bullets: false, // Does the slider have bullets visible?
    circular: true, // Does the slider should go to the first slide after showing the last?
    timer: true, // Does the slider have a timer active? Setting to false disables the timer.
    swipe: false
  }
});

$(function() {

  // Handle event for submenu
  function showSubMenuDesktop(sub_menu) {
    $('.desktop-menu .company-sub-nav').addClass('hide');
    $('.desktop-menu .investor-sub-nav').addClass('hide');
    $('.desktop-menu .brands-sub-nav').addClass('hide');
    switch(sub_menu) {
      case 'our company':
        if($('.desktop-menu .company-sub-nav').hasClass('hide')) {
          $('.desktop-menu .company-sub-nav').removeClass('hide');
        }
        $('.desktop-menu .company-sub-nav').mouseenter(function(e) {
          console.log('hello');
          $('.desktop-menu .company-sub-nav').removeClass('hide');
        });
        $('.desktop-menu .company-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .company-sub-nav').addClass('hide');
        });
        break;
      case 'investor relations':
        if($('.desktop-menu .investor-sub-nav').hasClass('hide')) {
          $('.desktop-menu .investor-sub-nav').removeClass('hide');
        }
        $('.desktop-menu .investor-sub-nav').mouseenter(function(e) {
          $('.desktop-menu .investor-sub-nav').removeClass('hide');
        });

        $('.desktop-menu .investor-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .investor-sub-nav').addClass('hide');
        });
        break;
      case 'our brands':
        if($('.desktop-menu .brands-sub-nav').hasClass('hide')) {
          $('.desktop-menu .brands-sub-nav').removeClass('hide');
        }
        $('.desktop-menu .brands-sub-nav').mouseenter(function(e) {
          $('.desktop-menu .brands-sub-nav').removeClass('hide');
        });

        $('.desktop-menu .brands-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .brands-sub-nav').addClass('hide');
        });
        break;
    }
  }

  function hideSubMenuDesktop(sub_menu) {
    switch(sub_menu) {
      case 'our company':
        if(!$('.desktop-menu .company-sub-nav').hasClass('hide')) {
          $('.desktop-menu .company-sub-nav').addClass('hide');
        }
        $('.desktop-menu .company-sub-nav').mouseenter(function(e) {
          console.log('hello');
          $('.desktop-menu .company-sub-nav').removeClass('hide');
        });
        $('.desktop-menu .company-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .company-sub-nav').addClass('hide');
        });

        break;
      case 'investor relations':
        if(!$('.desktop-menu .investor-sub-nav').hasClass('hide')) {
          $('.desktop-menu .investor-sub-nav').addClass('hide');
        }
        $('.desktop-menu .investor-sub-nav').mouseenter(function(e) {
          $('.desktop-menu .investor-sub-nav').removeClass('hide');
        });

        $('.desktop-menu .investor-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .investor-sub-nav').addClass('hide');
        });
        break;
      case 'our brands':
        if(!$('.desktop-menu .brands-sub-nav').hasClass('hide')) {
          $('.desktop-menu .brands-sub-nav').addClass('hide');
        }
        $('.desktop-menu .brands-sub-nav').mouseenter(function(e) {
          $('.desktop-menu .brands-sub-nav').removeClass('hide');
        });

        $('.desktop-menu .brands-sub-nav').mouseleave(function(e) {
          $('.desktop-menu .brands-sub-nav').addClass('hide');
        });
        break;
    }
  }

  $('.has-dropdown').mouseenter(function(e) {
    var target = event.target;
    var sub_menu = $(target).html().toLowerCase();
    showSubMenuDesktop(sub_menu);
  });

  $('.has-dropdown').mouseleave(function(e) {
    var target = event.target;
    var sub_menu = $(target).html().toLowerCase();
    hideSubMenuDesktop(sub_menu);
  });

  // Handle event for mobile menu
  
  $('.toggle-topbar.menu-icon a').on('click', function() {
    console.log($('.toggle-topbar.menu-icon a'));
    $('.mobile-menu').removeClass('hide');
    $('body').addClass('expand-menu');
  });

  // Set size for backdrop
  $('#backdrop').height($('#page').height());
  $('#backdrop').width($('#page').width());

  $('#backdrop').click(function() {
    $("body").hasClass("expand-menu") && ($("body").removeClass("expand-menu"), setTimeout(function() {
      $(".mobile-menu").addClass("hidden");
    }, 500))
  })
});