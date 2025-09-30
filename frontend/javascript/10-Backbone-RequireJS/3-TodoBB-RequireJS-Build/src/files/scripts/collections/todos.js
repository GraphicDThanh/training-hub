//- src/files/scripts/collections/todos.js
define([
    'backbone',
    'models/todo',
    'backbone.localStorage'
  ], function(Backbone, Todo, backboneLocalStorage) {
  'use strict';
  
  var Todos = Backbone.Collection.extend({
    model: Todo,

    //TODO: Save data to localStorage with Backbone.localStorage
    localStorage: new Backbone.LocalStorage('todo-collection'),

     //TODO: Return a collection which contain todo done
    done: function() {
      return this.filter(function(todo) {
        return todo.get('done');
      });
    },

    //TODO: Return a collection which contain todo not done
    notDone: function() {
      return this.filter(function(todo) {
        return !todo.get('done');
      });
    }
  });

  return new Todos();
});
