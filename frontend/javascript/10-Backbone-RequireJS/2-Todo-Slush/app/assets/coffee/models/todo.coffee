# File name: todo.js
define [ 'backbone' ], (Backbone) ->
  # reference global variable
  'use strict'
  Todo = Backbone.Model.extend(
    default:
      title: ''
      done: false
    toggleDone: ->
      !@get('done')
  )

  Todo