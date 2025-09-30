/**
 * TodoListViews class
 * Use to manage TodoView
 * @param {Array} todoList
 */
var TodoListViews = function(todoList) {
  this.todoList = todoList;
  this.rootElement = $('.todo-list');
}

TodoListViews.prototype.render = function(filterType) {
  this.rootElement.html('');
  var i = 0,
      todoView,
      len = this.todoList.length,
      self = this,
      counter = 0;
  for(; i < len; i ++) {
    todoView = new TodoView(this.todoList[i], self);
    switch(filterType) {
      case 'active':
        if(!this.todoList[i].done) {
          this.rootElement.prepend(todoView.render());
        }
        break;
      case 'completed':
        if(this.todoList[i].done) {
          this.rootElement.prepend(todoView.render());
        }
        break;
      default:
        this.rootElement.prepend(todoView.render());
    }
  }
}
