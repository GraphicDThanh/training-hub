// Fetch models from the server
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  url: '/todos'
});

var todos = new TodosCollection();
todo.fetch(); // sends HTTP GET to/ todos


// save models from the server
var todo2 = todos.get(2);
todo2.set('title', 'go fishing');
todo2.save(); // sends HTTP PUT to/ todos/ 2

todos.create({title: 'Try out code samples'});
// send HTTP POST to / todos and adds to collection



// deleting models from the server
todo2.destroy(); // send HTTP DELETE to/ todos/ 2 and removes from collection
