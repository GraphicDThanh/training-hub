---
uglify: true
---
$(document).ready(function ($) {

    // Sidebar Toggle

    $('.btn-navbar').click( function() {
	    $('html').toggleClass('expanded');
    });

	// Waypoints Scrolling

	var links = $('.navigation').find('li');
	var button = $('.intro button');
    var section = $('section');
    var mywindow = $(window);
    var htmlbody = $('html,body');


    section.waypoint(function (direction) {

        var datasection = $(this).attr('data-section');

        if (direction === 'down') {
            $('.navigation li[data-section="' + datasection + '"]').addClass('active').siblings().removeClass('active');
        }
        else {
        	var newsection = parseInt(datasection) - 1;
            $('.navigation li[data-section="' + newsection + '"]').addClass('active').siblings().removeClass('active');
        }

    });
    /*
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-section="1"]').addClass('active');
            $('.navigation li[data-section="2"]').removeClass('active');
        }
    });
    */
    function goToByScroll(datasection) {
        var $about_subnav = $('#about-nav'),
            height_navbar = $('#main-navbar').height(),
            height_about_subnav = $('#about-nav').height();
        console.log(height_navbar);
        console.log(height_about_subnav);
        if($about_subnav.hasClass('f-about-subnav')) {
            htmlbody.animate({
                scrollTop: $('.section[data-section="' + datasection + '"]').offset().top - (height_navbar + height_about_subnav)
            }, 500, 'easeOutQuart');
        } else {
            htmlbody.animate({
                scrollTop: $('.section[data-section="' + datasection + '"]').offset().top - (2 * height_about_subnav + height_navbar)
            }, 500, 'easeOutQuart');
        }


    }

    links.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });

    button.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });

    // Redirect external links

	$("a[rel='external']").click(function(){
		this.target = "_blank";
	});


	// Modernizr SVG backup

	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
	        return $(this).attr('src').replace('.svg', '.png');
	    });
	}

  // Show hide sliding panel
  $('.navbar-button, .sliding-panel-fade-screen').on('click touchstart', function(e) {
    $('.sliding-panel, .sliding-panel-fade-screen, .navbar-button').toggleClass('is-visible');
  });

  if ($(window).width() > 768) {
    // Plugin Full Page
    $('#fullpage').fullpage({
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: ['Header page', 'Markets page', 'Customer page', 'Footer'],

      afterLoad: function(anchorLink, index) {
        var navActive = $('#fp-nav a');
        var navHomePage = $('#navigation-homepage');

        if ($(navActive[0]).hasClass("active")) {
          $(navHomePage).removeClass("nav-background-blue");
        } else {
          $(navHomePage).addClass("nav-background-blue");
        }
      }
    });
  } else {
    $(window).on("scroll", function () {
        var navHomePage = $('#navigation-homepage');
        if ($(this).scrollTop() > 100) {
            $(navHomePage).addClass("nav-background-blue");
        }
        else {
            $(navHomePage).removeClass("nav-background-blue");
        }
    });

    // footer
    var $titles = $('#footer').find('h4');

    $.each($titles, function(index, item) {
        console.log(item);
        var $title = $(item),
        _titleId = $title.attr('id');
        $title.attr('data-toggle','collapse').attr('href',"#"+ _titleId +"Collapse").attr('aria-expanded','false').attr('aria-controls',_titleId + "Collapse");
        $title.append('<a class="collapseClose collapsed" id="'+_titleId +'Icon"></a>');

        $('#'+ _titleId + 'Collapse').addClass('collapse').on('shown.bs.collapse', function () {
            $('#'+ _titleId + 'Icon').removeClass('collapseClose').addClass('collapseOpen');
        });

        $('#'+ _titleId + 'Collapse').on('hidden.bs.collapse', function () {
            $('#'+ _titleId + 'Icon').removeClass('collapseOpen').addClass('collapseClose');
        });
    });

    // relayout contact form
    $contactForm    = $('form#contact'),
    $firstname      = $contactForm.find('input[name=firstname]');

    console.log($firstname.parent('div'));
    $firstname.parent('div').css('padding-bottom:15px');

  }

  $('.carousel').carousel();

  // Handle read more button in about responsive
  $('.btn-read-more').on('click', function(e) {
    var target = event.target;

    // console.log($(target).parent().children('p'));
    var content = $(target).parent().children('p');
    $(content).toggleClass('show');
    if($(content).hasClass('show')) {
        $(target).html('Read Less');
    } else {
        $(target).html('Read More');
    }
  });

  /**
   * handle click button close treding banner
   */
  $('.statusbar-fix-top__close-button').on('click', function() {
    $('.statusbar-fix-top').addClass('hide');
    $('#navigation-homepage').removeClass('is-changed');
    $('#fullpage').removeClass('is-changed');
  });

  // Show popup
  $('.intro-products-image').on('click', function(e) {
    $('body').addClass('modal-open');
    $('.popup-block-fixed').show();
  })

  // Close popup
  $('#popup-close').on('click', function(e) {
    $('body').removeClass('modal-open');
    $('.popup-block-fixed').hide();
  });

  var $img_popup = $('.popup-block-fixed .image-popup');
  function addClassForProductUseCase(klass) {
    $('body').addClass('modal-open');
    $('.popup-block-fixed').show();
    $img_popup.addClass(klass);
  }
  // Handle show model for product main use case
  $('#enterprise-message-platform').on('click', function(e) {
    if ($img_popup.hasClass('financial-publisher')) {
      $img_popup.removeClass('financial-publisher');
    }
    if ($img_popup.hasClass('banking-portal')) {
      $img_popup.removeClass('banking-portal');
    }
    addClassForProductUseCase('enterprise');
  });

  $('#financial-publisher').on('click', function(e) {
    if ($img_popup.hasClass('enterprise')) {
      $img_popup.removeClass('enterprise');
    }
    if ($img_popup.hasClass('banking-portal')) {
      $img_popup.removeClass('banking-portal');
    }
    addClassForProductUseCase('financial-publisher');
  });

  $('#banking-portal').on('click', function(e) {
    addClassForProductUseCase('banking-portal');

    if ($img_popup.hasClass('enterprise')) {
      $img_popup.removeClass('enterprise');
    }
    if ($img_popup.hasClass('financial-publisher')) {
      $img_popup.removeClass('financial-publisher');
    }
  });

});
