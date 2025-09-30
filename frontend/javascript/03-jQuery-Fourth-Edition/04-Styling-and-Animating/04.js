$(document).ready(function() {
  var $speech = $('div.speech');
  var defaultSize = $speech.css('fontSize');
  $('#switcher button').click(function() {
    var num = parseFloat($speech.css('fontSize'));
    switch (this.id) {
      case 'switcher-large':
        num *= 1.4;
        break;
      case 'switcher-small':
        num /= 1.4;
        break;
      default:
        num = parseFloat(defaultSize);
    }
    $speech.animate({fontSize: num + 'px'}, 'slow');
  });

  var $firstPara = $('p').eq(1);
  $firstPara.hide();
  $('a.more').click(function(event) {
    event.preventDefault();
    $firstPara.animate({
      opacity: 'toggle',
      height: 'toggle'
    }, 'slow');
    var $link = $(this);
    if ($link.text() == 'read more') {
      $link.text('read less');
    } else {
      $link.text('read more');
    }
  });

  $('div.label').click(function() {
    var paraWidth = $('div.speech p').outerWidth();
    var $switcher = $(this).parent();
    var switcherWidth = $switcher.outerWidth();
    $switcher
      .css({position: 'relative'})
      .fadeTo('fast', 0.5)
      .animate({
        left: paraWidth - switcherWidth
      }, {
        duration: 'slow',
        queue: false
      })
      .fadeTo('slow', 1.0)
      .slideUp('slow', function() {
        $switcher.css({backgroundColor: '#f00'});
      })
      .slideDown('slow');
  });

  $('p').eq(2)
    .css('border', '1px solid #333')
    .click(function() {
      var $clickedItem = $(this);
      $clickedItem.next().slideDown('slow', function() {
        $clickedItem.slideUp('slow');
      });
    });
  $('p').eq(3).css('backgroundColor', '#ccc').hide();

  // exercises
  // 1. Alter the stylesheet to hide the contents of the page initially. When the page
  // is loaded, fade in the contents slowly.
  $('body').hide(0).delay(300).fadeIn(2000);

  // 2. Give each paragraph a yellow background only when the mouse is over it.
  var pBackgroundColor = $('p').css('background-color');
  $('p').hover(function() {
    $(this).css('background-color', 'yellow');
  }, function() {
    $(this).css('background-color', pBackgroundColor);
  });

  // 3. Make a click of the title (<h2>) and simultaneously fade it to 25 percent opacity
  // and grow its left-hand margin to 20px. Then, when this animation is complete, 
  // fade the speech text to 50 percent opacity.
  $('h2').click(function() {
    $(this).animate({
      opacity: .25,
      marginLeft: '+=20px'}, 1000)
    .queue(function(){
      $('.speech').animate({
        opacity: .5}, 500);
    });
  });
});
