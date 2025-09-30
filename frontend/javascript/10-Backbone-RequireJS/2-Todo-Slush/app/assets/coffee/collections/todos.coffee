#- src/files/scripts/collections/todos.js
define (require) ->
  Backbone = require('backbone')
  Todo = require('models/todo')
  backboneLocalStorage = require('backboneLocalStorage')
  'use strict'
  Todos = Backbone.Collection.extend(
    model: Todo
    localStorage: new (backboneLocalStorage)('todo-collection')
    done: ->
      @filter (todo) ->
        todo.get 'done'
    notDone: ->
      @filter (todo) ->
        !todo.get('done')
  )
  new Todos