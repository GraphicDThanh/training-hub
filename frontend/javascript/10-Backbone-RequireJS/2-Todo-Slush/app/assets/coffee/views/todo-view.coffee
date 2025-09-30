#- File todo-view.js
define (require) ->
  $ = require('jquery')
  Backbone = require('backbone')
  Todo = require('models/todo')
  TodoRouter = require('routers/router')
  Templates = require('templates/templates')

  # reference global variable
  'use strict'
  TodoView = Backbone.View.extend(
    tagName: 'li'
    className: 'task-wrapper'
    events:
      'click .toggle': 'toggleStatus'
      'click .destroy': 'deleteTodo'
      'dblclick .task-title': 'editTodoTitle'
      'blur .edit-todo': 'closeEditMode'
      'keypress .edit-todo': 'saveWhenPressEnter'

    initialize: ->
      @listenTo @model, 'change', @render
      @listenTo @model, 'destroy', @removeTodoView
      @listenTo @model, 'checkTodo', @toggleVisible
      return

    render: ->
      todoHTML = Templates.todoTemplate(@model.toJSON())

      # show/hide if has filter
      @toggleVisible()
      @$el.html todoHTML

    toggleStatus: ->
      @model.save 'done': @model.toggleDone()
      return

    deleteTodo: ->
      @model.destroy()
      return

    removeTodoView: ->
      @remove()
      return

    editTodoTitle: ->
      @$('.task-title').addClass 'hide'
      @$('.edit-todo').removeClass('hide').focus()
      @$('.edit-todo').val @$('.task-title').html()
      return

    closeEditMode: ->
      titleAfterEdit = @$('.edit-todo').val().trim()
      if titleAfterEdit
        @model.save 'title': titleAfterEdit
      @$('.task-title').removeClass 'hide'
      @$('.edit-todo').addClass 'hide'
      return

    saveWhenPressEnter: (e) ->
      if e.which == 13
        @closeEditMode()
      return
 
    toggleVisible: ->
      @$el.toggleClass 'hide',
        TodoRouter.filterType == 'active' and @model.get('done') or
        TodoRouter.filterType == 'completed' and !@model.get('done')
      return
  )

  TodoView