//- src/files/scripts/models/todo.js

// reference global variable
// var app = app || {};

// ;(function() {
  'use strict';

  var Backbone = require('todo');
  
  module.exports = Backbone.Model.extend({
    default: {
      title: '',
      done: false
    },

    toggleDone: function() {
      return !this.get('done');
    }
  });
// })();