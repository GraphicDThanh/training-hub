define([
    'handlebars',
    'text!../templates/todo-template.tpl',
    'text!../templates/footer-template.tpl'
  ], function(Handlebars, _todoTemplate, _footerTemplate) {
    // Define helper compare
    Handlebars.registerHelper('compare', function (valueA, valueB, options) {
      if(arguments.length < 3) {
        throw new Error('Handlebars Helper "compare" needs 2 parameters');
      }

      var operator = options.hash.operator || "==";

      var operators = {
        '==':       function(a,b) { return a == b; },
        '===':      function(a,b) { return a === b; },
        '!=':       function(a,b) { return a != b; },
        '<':        function(a,b) { return a < b; },
        '>':        function(a,b) { return a > b; },
        '<=':       function(a,b) { return a <= b; },
        '>=':       function(a,b) { return a >= b; },
        'typeof':   function(a,b) { return typeof a == b; }
      };

      if(!operators[operator]) {
        throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
      }

      var result = operators[operator](valueA, valueB);

      if(result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    /*
     * Given a template and an optional arguments object, return
     * the compile template, or, if a context is passed, invokes the compiled
     * template with the given context
     */
    var _compiled = function(tpl, context) {
      var compiled = Handlebars.compile(tpl);
      return (context ? compiled(context) : compiled);
    };

    return {
      todoTemplate: function() {
        return _compiled(_todoTemplate, arguments[0]);
      },
      footerTemplate: function() {
        return _compiled(_footerTemplate, arguments[0]);
      }
    };
});