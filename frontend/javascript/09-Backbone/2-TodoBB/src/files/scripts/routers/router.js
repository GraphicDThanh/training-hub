//- src/files/scripts/routers/router.js
;(function() {
  'use strict';
  
  var TodoRouter = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(type) {
      app.filterType = type || '';

      // trigger event filterByType
      app.Todos.trigger('filterByType');
    }
  });

  //Initialize the router
  app.todoRouter = new TodoRouter();

  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();
})();