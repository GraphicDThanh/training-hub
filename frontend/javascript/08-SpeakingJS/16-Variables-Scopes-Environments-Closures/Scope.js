function foo(arg) {
  function bar() {
    console.log('arg: ' + arg);
  }
  bar();
}
// result: 
console.log(foo('hello')); // arg: hello
// foo is outer scope, bar is inner scope


var x = 'global';
function f() {
  var x = 'local';
  console.log(x);
}
