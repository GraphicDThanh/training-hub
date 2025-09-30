//- src/files/scripts/views/todo-view.js

// reference global variable
var app = app || {};

;(function() {
  'use strict';
  
  app.TodoView = Backbone.View.extend({
    tagName: 'li',

    className: 'task-wrapper',

    events: {
      'click .toggle': 'toggleStatus',
      'click .destroy': 'deleteTodo',
      'dblclick .task-title': 'editTodoTitle',
      'blur .edit-todo': 'closeEditMode',
      'keypress .edit-todo': 'saveWhenPressEnter'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.removeTodoView);
      this.listenTo(this.model, 'checkTodo', this.toggleVisible);
    },

    //TODO: render a todo to a visew
    render: function() {
      var todoSource = $('#todo-template').html(),
          todoTemplate = Handlebars.compile(todoSource),
          todoHTML = todoTemplate(this.model.toJSON());

      // show/hide if has filter
      this.toggleVisible();

      return this.$el.html(todoHTML);
    },

    toggleStatus: function() {
      this.model.save({
        'done': this.model.toggleDone()
      });
    },

    //TODO: Handle event when click button destroy
    deleteTodo: function() {
      this.model.destroy();
    },

    //TODO: Remove todoView when have event remove model from collection
    removeTodoView: function() {
      this.remove();
    },

    //TODO: Edit todo title
    editTodoTitle: function() {
      this.$('.task-title').addClass('hide');
      this.$('.edit-todo').removeClass('hide').focus();
      this.$('.edit-todo').val(this.$('.task-title').html());
    },

    //TODO: close edit mode when not focus on edit-todo
    closeEditMode: function() {
      var titleAfterEdit = this.$('.edit-todo').val().trim();
      if(titleAfterEdit) {
        this.model.save({'title': titleAfterEdit});
      }

      this.$('.task-title').removeClass('hide');
      this.$('.edit-todo').addClass('hide');
    },

    saveWhenPressEnter: function(e) {
      if(e.which === 13) {
        this.closeEditMode();
      }
    },

    toggleVisible: function () {
      console.log('aaa');
      this.$el.toggleClass('hide', 
        ((app.filterType === 'active') && (this.model.get('done'))) || 
        ((app.filterType === 'completed') && (!this.model.get('done')))
      );
    }
  });
})();