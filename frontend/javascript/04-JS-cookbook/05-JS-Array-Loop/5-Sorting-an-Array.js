// Use sort() method
var fruitArray = ['straberry','apple','banana','lime'];
console.log(fruitArray.sort());

var numberArray = [4,23,4,56,2];
console.log(numberArray.sort()); // return 2,23,4,4,56
// Result not sort follow numerically, can do that by:

function compareNumbers(a,b) {
  return a - b;
}

var numArray = [2,45,32,1,23];
console.log(numArray.sort(compareNumbers));
// print 1,2,23,32,45

var numberArray = ["34","4","5"];
console.log(numberArray.sort(compareNumbers));
// print 4,5,34


// do a reverse 
var numberArray = [4,5,6,3,2];
numberArray.sort();
numberArray.reverse();
console.log(numberArray);

var numberArray = [4,53,0,21,31,64,33,24];
numberArray.sort();
numberArray.reverse();
console.log(numberArray);


var numberArray = [4,53,0,21,31,64,33,24];
numberArray.sort(compareNumbers);
numberArray.reverse();
console.log(numberArray);