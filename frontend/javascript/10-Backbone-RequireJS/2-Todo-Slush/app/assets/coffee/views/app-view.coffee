# File app-view.js
define (require) ->
  $ = require('jquery')
  Backbone = require('backbone')
  Todos = require('collections/todos')
  TodoView = require('views/todo-view')
  TodoRouter = require('routers/router')
  Templates = require('templates/templates')

  'use strict'
  AppView = Backbone.View.extend(
    el: '.todoapp'
    initialize: ->
      @$main = $('#main')
      @$footer = $('#footer')
      @$input = $('#new-todo')
      @$todoList = @$('#todo-list')
      @$toogleAll = @$('#toggle-all')
      #TODO: init event for app
      @listenTo Todos, 'add', @appendOneTodo
      @listenTo Todos, 'all', @render
      @listenTo Todos, 'reset', @appendAllTodo
      @listenTo Todos, 'filterByType', @filterTodo
      # TODO: fetch data from localStorage
      Todos.fetch reset: true
      return

    events:
      'keypress #new-todo': 'addNewTodo'
      'click #toggle-all': 'toggleAll'
      'click #clear-completed': 'destroyCompleted'

    render: ->
      #TODO: define done and notDone number and call to function in Todos
      notDone = Todos.notDone().length
      done = Todos.done().length

      #TODO: Handle when collection not empty
      if Todos.length
        @$main.show()
        @$footer.show()

        #TODO: Build footer by template and put counter in
        footerHTML = Templates.footerTemplate(
          'notDone': notDone
          'done': done)
        @$footer.html footerHTML

        # handle UI for click button filter
        $('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + TodoRouter.filterType + '"]')
          .addClass 'selected'

        # Handle style for toggle all
        if notDone
          @$toogleAll.prop 'checked', false
        else
          @$toogleAll.prop 'checked', true
      else
        @$main.hide()
        @$footer.hide()
      return

    appendOneTodo: (todo) ->
      newTodoView = new TodoView(model: todo)
      @$todoList.append newTodoView.render()
      return

    appendAllTodo: ->
      #NOTICE: bind this to each function to set context
      Todos.each @appendOneTodo, this
      return

    addNewTodo: (events) ->
      if events.which == 13
        Todos.create
          'title': @$input.val()
          'done': false
        #TODO: return empty value for input
        @$input.val ''
      return

    toggleAll: ->
      toggleAllState = @$toogleAll.is(':checked')
      Todos.each (todo) ->
        #Save todo attr done with toggleAll state
        todo.save 'done': toggleAllState
        return
      return

    destroyCompleted: ->
      _.invoke Todos.done(), 'destroy'
      return

    filterTodo: ->
      Todos.each (todo) ->
        todo.trigger 'checkTodo'
        return
      return
  )

  AppView