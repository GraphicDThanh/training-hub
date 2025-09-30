(function() {
  var foo = 1;
  (function() {
    console.log(foo);
    var foo = 2;
  })();
  console.log(foo);
})();

// result
// undefine
// 1
// 
(function(){
  console.log(foo()); // 3

  var foo = function() {
    return 1;
  };

  function foo() {
    return 2;
  };

  function foo() {
    return 3;
  };
})();
