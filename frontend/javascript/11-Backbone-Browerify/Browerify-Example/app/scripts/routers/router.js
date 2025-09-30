//- src/files/scripts/routers/router.js
// ;(function() {
  'use strict';
  var Backbone = require('backbone');
  var Todos = require('../collections/todos');

  var TodoRouter = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(type) {
      filterType = type || '';

      // trigger event filterByType
      Todos.trigger('filterByType');
    }
  });

  //Initialize the router
  module.exports = new TodoRouter();

  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();
// })();