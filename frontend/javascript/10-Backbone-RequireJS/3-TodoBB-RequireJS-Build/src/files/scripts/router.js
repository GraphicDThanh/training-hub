//- src/files/scripts/routers/router.js
define([
    'backbone',
    'collections/todos'
  ], function(Backbone, Todos) {
  'use strict';
  
  var TodoRouter = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(type) {
      this.filterType = type || '';

      // trigger event filterByType
      Todos.trigger('filterByType');
    }
  });

  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();

  return new TodoRouter();
});