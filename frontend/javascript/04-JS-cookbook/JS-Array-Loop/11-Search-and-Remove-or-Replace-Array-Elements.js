// You want to find occurrences of a given value in an array, and either remove the element or replace with another value
var animals = new Array("dog", "cat", "seal", "walrus", "lion", "cat");

// remove the element from array
animals.splice(animals.indexOf("walrus"), 1);// dog,cat,seal,lion,cat
console.log(animals);

// splice in new element
animals.splice(animals.lastIndexOf("cat"),1,"monkey"); // dog,cat,seal,seal,lion,monkey 
console.log(animals);

// the splice() method takes 3 parameter.
// first is required! It's where the splicing is to take place = the index

// second and third parameter are optional

// second: the number of elements to remove
// third: a substitute

// if first is negative, the elements will be spliced from the end
var animals = new Array("cat", "walrus", "lion", "cat");
//splice in new element
animals.splice(-1,1,"monkey"); // cat,walrus,lion,monkey
console.log(animals);


// if the second NOT provided, all elements from the index to the end will remove
var animals = new Array("cat", "walrus", "lion", "cat");
// replace all elements after second
animals.splice(2);//cat, walrus
console.log(animals);


// third parameter: the replaced value, can be set of replacement values, separated by commas
var animals = new Array("cat", "walrus", "lion", "cat");
animals.splice(2,1,"zebra","elephant"); //cat,walrus,zebra,elephant,cat
console.log(animals);
