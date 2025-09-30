/**
 * Todo class
 * Using to manage todo content and state
 * @param {String} ctodoText
 */
var Todo = function(todoObject) {
  this.id = todoObject.id;
  this.content = todoObject.content;
  this.done = todoObject.done;
}

Todo.prototype.toogleStatus = function() {
  this.done = !this.done;
}
