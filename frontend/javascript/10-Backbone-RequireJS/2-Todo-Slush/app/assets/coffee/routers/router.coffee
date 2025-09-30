#- File name: router.js
define (require) ->
  Backbone = require('backbone')
  Todos = require('collections/todos')

  'use strict'
  TodoRouter = Backbone.Router.extend(
    routes: '*filter': 'setFilter'
    setFilter: (type) ->
      @filterType = type or ''
      # trigger event filterByType
      Todos.trigger 'filterByType'
      return
  )
  # Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start()

  new TodoRouter