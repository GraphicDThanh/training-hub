// Use slice() method
var origArray = new Array(4);
origArray[0] = new Array("one","two");
origArray[1] = new Array("three","four");
origArray[2] = new Array("five","six");
origArray[3] = new Array("seven","eight");

// create a new arraay using slice
var newArray = origArray.slice(1,3);// from 1 to 3 means element have index 1 and 2
console.log(newArray);

// When slice by slice() method or directly variable diagram,
//object copied by reference
var first = new Array("one","two","three");
var second = first; // copy by reference
second[1] = "apple"; // first and second arrays now have "one","apple","three"


// When a value is changed in the new array, the change is refected in the original array
var origArray = new Array(4);
origArray[0] = new Array("one","two");
origArray[1] = new Array("three","four");
origArray[2] = new Array("five","six");
origArray[3] = new Array("seven","eight");

var newArray = origArray.slice(1,3);
console.log(newArray);// print out three,four,five,six

// modify original
origArray[1][0] = "octopus";

// print out new
console.log(newArray); // print out octopus,four,five,six

// modify new
newArray[1][1] = "kitten";

//print out old
console.log(origArray); // print out one,two,octopus,four,five,kitten,seven,eight



// Use slice to convert the function arguments property into a proper array:
var args = Array.prototype.slice.call(arguments);
// IE 8 doesn't support slice @@!!!!