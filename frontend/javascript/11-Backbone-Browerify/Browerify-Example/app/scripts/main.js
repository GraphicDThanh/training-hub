// Run browserify app/scripts/main.js > dist/scripts/bundle.js first
//- src/files/scripts/app.js
// var app = app || {};
var $ = require('jquery');
AppView = require('./views/app-view');
// ;(function() {
// The only thing that should be in a DOMReady
$(function () {
  console.log('aaa');
  new AppView();
});
// })();
