(function($) {

  var ListView = Backbone.View.extend({
    el: $('body'), // attaches 'this.el' to an existing element

    initialize: function() {
      _.bindAll(this, 'render'); // fixes loss of content for 'this' within methods

      this.render(); // not all views are self-rendering. This one is
    },

    render: function() {
      $(this.el).append('<ul> <li>Hello World</li> </ul>')
    }
  });

  var listView = new ListView();
})(jQuery);