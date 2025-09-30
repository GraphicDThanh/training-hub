;(function() {
  window.App = {
    // defining app name space, you can rename it as per your project name
    Models: {},
    Collections: {},
    Views: {}
  };

  // helper template
  window.template = function(id) {
    return _.template($('#' + id).html());
  }

  // Person Model
  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: 'Guest User',
      age: 23,
      occupation: 'worker'
    }
  });

  // List of Peole
  App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
  });

  App.Views.People = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
      console.log(this.collection);
    },

    render: function() {
      this.collection.each(function(person) {
        var personView = new App.Views.Person({ model: person });
        this.$el.append(personView.render().el);// adding all the person object
      }, this);
      return this;
    }
  });

  // a view = the View for a People
  App.Views.Person = Backbone.View.extend({
    tagName: 'li',

    template: template('personTemplate'),

    render: function(){
      this.$el.html( this.template(this.model.toJSON()));
      return this;
    }
  });

  var peopleCollection = new App.Collections.People([
    {
      name: 'A',
      age: 13,
      occupation: 'singer'
    },
    {
      name: 'B',
      age: 88,
      occupation: 'doctor'
    },
    {
      name: 'C',
      age: 90,
      occupation: 'baker'
    }
  ]);

  var peopleView = new App.Views.People({ collection: peopleCollection });
  $(document.body).append(peopleView.render().el); // adding people view in DOM
})();
