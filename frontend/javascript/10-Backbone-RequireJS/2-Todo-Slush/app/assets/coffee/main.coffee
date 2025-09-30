require.config
  paths:
    jquery: '../vendor/jquery/dist/jquery'
    underscore: '../vendor/underscore/underscore'
    backbone: '../vendor/backbone/backbone'
    handlebars: '../vendor/requirejs-hbs/example/assets/lib/handlebars'
    text: '../vendor/requirejs-hbs/example/assets/lib/text'
    backboneLocalStorage: '../vendor/Backbone.localStorage/backbone.localStorage'

  shim:
    jquery: exports: '$'

    underscore: exports: '_'

    backbone:
      deps: [
        'underscore'
        'jquery'
      ]
      exports: 'Backbone'

    handlebars: exports: 'Handlebars'

    backboneLocalStorage:
      deps: ['backbone']
      exports: 'Backbone'

  # for development
  urlArgs: (new Date()).getTime()

require ['app'], (App) ->
  App.initialize()

