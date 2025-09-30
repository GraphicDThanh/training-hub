$(document).ready(function() {
  // Enable hover effect on the styl switcher
  $('#switcher').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });

  // Alow the style switcher to expand and collapse
  var toggleSwitcher = function(event) {
    if (!$(event.target).is('button')) {
      $('#switcher button').toggleClass('hidden');
    }
  };

  $('#switcher').on('click', toggleSwitcher);

  // Simulate a click so we start in a collaped state
  $('#switcher').click();

  // The setBodyClass() function changes the page style.
  // The style switcher state is also updated.
  var setBodyClass = function(className) {
    $('body').removeClass().addClass(className);

    $('#switcher button').removeClass('selected');
    $('#switcher-' + className).addClass('selected');

    $('#switcher').off('click', toggleSwitcher);

    if(className == 'default') {
      $('#switcher').on('click', toggleSwitcher);
    }
  };

  // begin with the switcher-default button 'selected'
  $('#switcher-default').addClass('selected');

  // begin with the switcher-default button 'selected'
  var triggers = {
    D: 'default',
    N: 'narrow',
    L: 'large'
  };

  // call setBodyClass() when a button is clicked
  $('#switcher').click(function(event) {
    if($(event.target).is('button')) {
      var bodyClass = event.target.id.split('-')[1];
      setBodyClass(bodyClass);
    }
  });

  // Call setBodyClass() when a key is pressed.
  $(document).keyup(function(event) {
    var key = String.fromCharCode(event.which);
    if (key in triggers) {
      setBodyClass(triggers[key]);
    }
  });

  // Exercise 1
  // added span to author class
  $('.author').on('click', function() {
    $('.author span').toggleClass('selected');
  });


  // Exercise 2
  $('h3.chapter-title').on('dblclick', function(){
    $(this).nextAll().toggleClass('hidden');
  });

  // Exercise 3
  var keySwitch = ['D', 'N', 'L'], i = 0;

  // Call setBodyClass() when a key is pressed
  // Also listen for right arrow key
  $(document).on('keyup', function(event) {
    var key = String.fromCharCode(event.which);
    setBodyClass(triggers[key]);

    if (event.which === 39) {
      setBodyClass(triggers[keySwitch[i]]);
      (i < keySwitch.length-1) ? i++ : i=0;
    }
  });
});