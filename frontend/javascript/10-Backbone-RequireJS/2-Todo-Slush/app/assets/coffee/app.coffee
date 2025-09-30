# Filename: app.js
define (require) ->
  Backbone = require('backbone')
  AppView = require('views/app-view')

  initialize = ->
    new AppView
  initialize: initialize