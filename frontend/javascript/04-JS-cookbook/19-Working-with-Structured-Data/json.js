//19.3Generate a JavaScript Object with JSON, Old-School Style
// If the object is an array:
// var arr = new Array("one","two","three");
// the JSON notation would be equivalent to the literal notation for the array:
// "['one','two','three'];
// If an object:
// var obj3 = {
// prop1 : "test",
// result : true,
// num : 5.44,
// name : "Joe",
// cts : [45,62,13]};
// the JSON notation would be:
// {"prop1":"test","result":true,"num":5.44,"name":"Joe","cts":[45,62,13]}

var jsonobj = '{"test" : "value1", "test2" : 3.44, "test3" : true}';
var obj = eval("(" + jsonobj + ")");
alert(obj.test2); // print out 3.44

// or
var jsonobj = '{"test" : "value1", "test2" : 3.44, "test3" : true}';
eval("var obj="+jsonobj);
alert(obj.test); // print out 3.44


//19.4 Parse a JSON Formatted String
// You want to safely create a JavaScript object from JSON. 
// You also want to replace the numeric representation of 
// true and false (0 and 1, respectively) with their Boolean
// counterparts (false and true).
var jsonobj = '{"test" : "value1", "test2" : 3.44, "test3" : 0}';
var obj = JSON.parse(jsonobj, function (key, value) {
  if (typeof value == 'number') {
    if (value == 0) {
      value = false;
    } else if (value == 1) {
      value = true;
    }
    return value;
  }
});

alert(obj.test3); // print false

// 19.5 Convert an Object to a Filtered/Transformed String with JSON
// You need to convert a JavaScript object to a JSON formatted string for posting to a web
// application. However, the web application has data requirements that differ from your
// client application.

// ==> USE JSON.stringify method
function convertBoolToNum(key, value) {
  if (typeof value == 'boolean') {
    if (value) value = 1;
    else value = 0;
  }
  return value;
};

window.onload = function() {
  var obj = {"test" : "value1", "test2" : 3.44, "test3" : false};
  var jsonobj = JSON.stringify(obj, convertBoolToNum, 3);

  alert(jsonobj); // test3 should be 0
}