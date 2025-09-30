//- src/files/scripts/models/todo.js

// reference global variable
var app = app || {};

;(function() {
  'use strict';
  
  app.Todo = Backbone.Model.extend({
    default: {
      title: '',
      done: false
    },

    toggleDone: function() {
      return !this.get('done');
    }
  });
})();