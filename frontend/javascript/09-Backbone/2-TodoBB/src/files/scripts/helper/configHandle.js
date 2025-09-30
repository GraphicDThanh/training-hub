;(function() {
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
})();
