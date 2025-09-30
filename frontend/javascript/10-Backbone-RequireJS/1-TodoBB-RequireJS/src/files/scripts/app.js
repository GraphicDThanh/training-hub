require.config({
  paths: {
    'jquery': '../bower-components/jquery/dist/jquery',
    'underscore': '../bower-components/underscore/underscore',
    'bootstrap': '../bower-components/bootstrap-sass-official/assets/javascripts/bootstrap',
    'backbone': '../bower-components/backbone/backbone',
    'backbone.localStorage': '../bower-components/Backbone.localStorage/backbone.localStorage',
    'handlebars': '../bower-components/handlebars/handlebars',
    'templates': 'templates',
    'text': 'text'
  },

  shim: {
    'jquery': {
      exports: '$'
    },

    'underscore': {
      exports: "_"
    },

    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },

    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

// Filename: app.js
define([
  'backbone',
  'views/app-view'
], function(Backbone, AppView){
  new AppView();
});