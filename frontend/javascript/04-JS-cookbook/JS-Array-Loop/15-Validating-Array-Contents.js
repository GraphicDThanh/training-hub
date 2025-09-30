// Use every() method to check
var elemSet = new Array("**", "123","aaa","abc","-",46,"AAA");

//test function
function textValue (element,index,array) {
  var textExp = /^[a-zA-Z]+$/;
  return textExp.test(element);
}

// run test

console.log(element.every(textValue));