$(function() {
  'use strict';
  var self = this;
  var currentWidth = $(window).width(),
      initY = $(window).scrollTop(),
      hMainNav = $('.main-navigation').height();
  $(document).ready(function() {
    if(currentWidth < 768) {
      handleMobileMenu();
    }

    brandSectionHeight();
    equalMarginBrandContent();


    // Handle evenet for click button scroll to slide 2
    clickToScroll($('.donovan-header__btn-down'));

    // Handle event for main navigation
    clickToScroll($('.main-navigation__menu li'));

    // Handle event for button scroll to top
    clickToScroll($('.donovan-footer__to-top--btn'));

    // Handle add class for active item in main menu
    clickItemInMainNav();

    // Handle for fixed main menu by scroll
    fixedNavByScroll();

    // Handle when scroll the page
    $(window).scroll(function () {
      var currentY = $(window).scrollTop(),
          pointList = waitPointList();
      fixedNavByScroll(currentY);
    });  

    reliazePointToSetActiveForNavItem();

    $(window).bind('resize', function() {
      brandSectionHeight();
      equalMarginBrandContent();
    }); 

  });

  function reliazePointToSetActiveForNavItem() {
    // DO BY MANUAL
    var sectionPointList = waitPointList(), 
        pageCurrentPosition = $(window).scrollTop(), 
        tmp, x, y, z,
        index, 
        direction = 'down',
        initPoint = pageCurrentPosition,
        count = 0,
        toUpFlat = false,
        toDownFlat = false;

    // Init highlight
    index = getSectionWhenReload(pageCurrentPosition, sectionPointList);
    highlightMenuAtIndex(index);


    // Highlight by scroll
    $(window).scroll(function() {
      // console.log(toUpFlat);
      // console.log(toDownFlat);
      var scroll = $(window).scrollTop();
      x = initPoint;
      tmp = pageCurrentPosition;
      initPoint = tmp;
      y = initPoint;

      pageCurrentPosition = scroll;
      z = pageCurrentPosition;

      

      if(count > 1) {
        if(x < y && y < z) {
          // console.log('direction down');
          index = getSectionClosestFloor(scroll, sectionPointList, toDownFlat, toUpFlat);
          // console.log(index);
          highlightMenuAtIndex(index);
        }
        else if (x > y && y > z) {
          direction = 'up';
          // console.log('direction up');
          index = getSectionClosestUp(scroll, sectionPointList, toUpFlat, toDownFlat);
          // console.log(index);
          highlightMenuAtIndex(index);
        } else if (x < y && y > z){
          // console.log('change down to up');
          toUpFlat = true;
        } else {
          // console.log('change up to down');
          toDownFlat = true;
        }
      }

      count ++;
      // return toUpFlat, toDownFlat;
    });
  }

  var getSectionWhenReload = function(initPoint, sectionPointList) {
    var index = -1;
    for (var i = 0, len = sectionPointList.length; i < len - 1; i++) {
      if (initPoint > (sectionPointList[i] + hMainNav) && initPoint < (sectionPointList[i + 1] + hMainNav)) {
        index = i + 1;
        break;
      }
    }
    return index;
  };
  
  // Handle by scroll direction Down
  var getSectionClosestFloor = function(scroll, sectionPointList, toDownFlat) {
    var index = -1;
    for (var i = 0, len = sectionPointList.length; i < len - 1; i++) {
      if (scroll > (sectionPointList[i]) && scroll < (sectionPointList[i + 1])) {
        index = i + 1;
      }
    }
    return index;
  };

  // Handle by scroll direction Up
  var getSectionClosestUp = function(scroll, sectionPointList, toUpFlat) {
    var index = -1;
    for (var len = sectionPointList.length, i = len; i > 0; i--) {
      if(toUpFlat) {
        if(scroll < sectionPointList[i - 1]) {
          toUpFlat = false;
          index = i - 1;
        } else if (scroll < sectionPointList[i + 1] && scroll > sectionPointList[i - 1]) {
          index = i + 1;
        }
      } else if (scroll < sectionPointList[i + 1] && scroll > sectionPointList[i - 1]) {
          if(scroll < sectionPointList[i]) {
            index = i + 1;
          }
      }
    }
    return index;
  };

  var highlightMenuAtIndex = function(index) {
    var $navItemActive = $('.main-navigation__menu li[data-slide="' + index + '"]');
    if (!$navItemActive.hasClass('main-navigation__menu-item--active')) {
      $('.main-navigation__menu li').removeClass('main-navigation__menu-item--active');
      $navItemActive.addClass('main-navigation__menu-item--active');
    }
  };
  /**
   * Set Height for Brand Section
   * @return {[type]} [description]
   */
  function brandSectionHeight() {
    var hScreen = $(window).height();
    $('.donovan-header').css({'height': hScreen});
  }

  /**
   * Set Equal Margin for Brand Content
   * @return {[type]} [description]
   */
  function equalMarginBrandContent() {
    var hScreen = $(window).height(),
        $brand_content = $('.donovan-header__content'),
        height_header_content = $brand_content.height(),
        equal_distance = (hScreen - height_header_content) / 2;
    $brand_content.css({
      'margin-top': equal_distance,
      'margin-bottom': equal_distance
    }); 
  }

  /**
   * Handle Mobile Dropdown Menu
   * @return {[type]} [description]
   */
  function handleMobileMenu() {
    $('.main-navigation__btn-dropdown').on('click', function() {
      $('.main-navigation__menu').slideToggle('slow');
    });

    $('.main-navigation__menu-item').on('click', function() {
      $('.main-navigation__menu').hide('fast');
    });
  }

  /**
   * Use to Handle click and scroll to goal by data-slide attribute
   * @param  {[type]} dataSlide [description]
   * @return {[type]}           [description]
   */
  function goByScroll(dataSlide) {
    var $page = $('html, body'),
        $goalElement = $('.section[data-slide="' + dataSlide + '"]'),
        goalPosition = $goalElement.offset().top,
        offsetTopSlide2 = $('.section[data-slide="2"]').offset().top,
        positionFixedNav;
    positionFixedNav = offsetTopSlide2 - hMainNav;

    if(goalPosition > positionFixedNav) {
      goalPosition = goalPosition - hMainNav + 1;
    } 
      
    $page.animate({
      scrollTop: goalPosition
    }, 2000, 'easeInOutQuint');
  }

  function clickToScroll(element) {
    element.on('click', function(e) {
      e.preventDefault();
      var dataSlide = $(this).attr('data-slide');
      goByScroll(dataSlide);
    });
  }

  function clickItemInMainNav() {
    var $navItem = $('.main-navigation__menu li');
    $navItem.on('click', function() {
      $navItem.removeClass('main-navigation__menu-item--active');
      $(this).addClass('main-navigation__menu-item--active');
    });
  }

  function fixedNavByScroll(currentY) {
    var $mainNav = $('.main-navigation'),
        fixedNavY = $('.section[data-slide="2"]').offset().top - $mainNav.height();

    if(currentY > fixedNavY) {
      $mainNav.addClass('main-navigation--fixed');
    } else {
      $mainNav.removeClass('main-navigation--fixed');
    }
  }


  function addClassActiveByScrollPoint(sectionOrder) {
    var $navItem = $('.main-navigation__menu li');

    // $navItem.removeClass('main-navigation__menu-item--active');

    $navItem.each(function () {
      var dataSlide = $(this).attr('data-slide');
      if(dataSlide == sectionOrder) {
        $(this).addClass('main-navigation__menu-item--active');
      }
    });
  }

  function waitPointList() {
    var sectionPoint,
        sectionOrder,
        waitPointListArray = [],
        $section = $('.section');

    $section.each(function() {
      sectionOrder = $(this).attr('data-slide');

      // sectionOrder is string, so, just use == to compare
      if(sectionOrder == 1) {
        sectionPoint = $(this).offset().top;
      } else {
        // 1 for the border
        sectionPoint = $(this).offset().top - hMainNav + 1;
      }
      
      // Push to array
      waitPointListArray.push(sectionPoint);
    });
    return waitPointListArray;
  }
});

