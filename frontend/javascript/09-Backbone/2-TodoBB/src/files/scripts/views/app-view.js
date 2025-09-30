//- src/files/scripts/views/app-view.js

var app = app || {};

;(function() {
  'use strict';
  
  app.AppView = Backbone.View.extend({
    el: '.todoapp',

    //TODO: Config status template for the footer
    statusTemplate: function (contextStatus) {
      var statusTemplateScript = $('#status-template').html();
      var theStatusTemplate = Handlebars.compile(statusTemplateScript);
      return theStatusTemplate(contextStatus);
    },

    initialize: function() {
      this.$main = $('#main');
      this.$footer = $('#footer');
      this.$input = $('#new-todo');
      this.$todoList = this.$('#todo-list');
      this.$toogleAll = this.$('#toggle-all');

      //TODO: init event for app
      this.listenTo(app.Todos, 'add', this.appendOneTodo);
      this.listenTo(app.Todos, 'all', this.render);
      this.listenTo(app.Todos, 'reset', this.appendAllTodo);
      this.listenTo(app.Todos, 'filterByType', this.filterTodo);

      // TODO: fetch data from localStorage
      app.Todos.fetch({reset: true});
    },

    //TODO: create all events relative with app-view
    events: {
      'keypress #new-todo': 'addNewTodo',
      'click #toggle-all': 'toggleAll',
      'click #clear-completed': 'destroyCompleted'
    },

    //TODO: App will render each time Collection have all change
    render: function(){
      //TODO: define done and notDone number and call to function in Todos
      var notDone = app.Todos.notDone().length,
          done = app.Todos.done().length;

      //TODO Define to load footer-template and compile
      var footerHTML,
          footerSource = $('#footer-template').html(),
          footerTemplate = Handlebars.compile(footerSource);

      //TODO: Handle when collection not empty
      if(app.Todos.length) {
        this.$main.show();
        this.$footer.show();

        //TODO: Build footer by template and put counter in
        footerHTML = footerTemplate({
          'notDone': notDone,
          'done': done
        });

        this.$footer.html(footerHTML);

        // handle UI for click button filter
        $('#filters li a')
          .removeClass('selected')
          .filter('[href="#/'+ app.filterType + '"]')
          .addClass('selected');

        // Handle style for toggle all   
        if(notDone) {
          this.$toogleAll.prop('checked', false);
        } else {
          this.$toogleAll.prop('checked', true);
        }
      } else {
        this.$main.hide();
        this.$footer.hide();
      }
    },

    //TODO: Add one new todo for UI after hear create new todo to colection
    appendOneTodo: function(todo) {
      var newTodoView = new app.TodoView({model: todo});
      this.$todoList.append(newTodoView.render());
      
    },

    appendAllTodo: function() {
      //NOTICE: bind this to each function to set context
      app.Todos.each(this.appendOneTodo, this);
    },

    //TODO: Handle when user add todo by press key Enter, the Collection create new todo
    addNewTodo: function(events) {
      if(events.which === 13) {
        app.Todos.create({
          'title': this.$input.val(),
          'done': false
        });

        //TODO: return empty value for input
        this.$input.val('');
      }
    },

    //TODO: Check button toggle-all and set state beyond it
    toggleAll: function() {
      var toggleAllState = this.$toogleAll.is(':checked');

      app.Todos.each(function(todo) {
        //Save todo attr done with toggleAll state
        todo.save({
          'done': toggleAllState
        });
      });
    },

    destroyCompleted: function() {
      _.invoke(app.Todos.done(), 'destroy');
    },

    filterTodo: function() {
      app.Todos.each(function(todo) {
        todo.trigger('checkTodo');
      });
    }
  });
})();