//- src/files/scripts/models/todo.js
define([
    'backbone'
  ], function(Backbone) {

  // reference global variable
  'use strict';
  
  var Todo = Backbone.Model.extend({
    default: {
      title: '',
      done: false
    },

    toggleDone: function() {
      return !this.get('done');
    }
  });

  return Todo;
});