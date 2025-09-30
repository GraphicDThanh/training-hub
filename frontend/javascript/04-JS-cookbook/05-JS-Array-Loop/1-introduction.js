function chgArray(arr) {
  arr[0] = "suprise!";
}

var newArray = new Array("val1", "val2");
var newLiteral = ["val1", "val2"];

chgArray(newArray);
chgArray(newLiteral);

console.log(newArray); // prints surprise, val2
console.log(newLiteral); // prints surprise!, val2 

// an array can hold values of different data types
var arrObject = new Array("val1", 34, true); // string, number, boolean
var arrLiteral = [arrObject, "val2", 18, false]; //// object, string, number, boolean

console.log(arrObject);
console.log(arrLiteral);


//Access element in an array use index
var arrObject = new Array();
arrObject[0] ="cat"; // array hase one element
console.log(arrObject[0]);// will print cat

var farmAnimals = new Array("cat","dog","horse","pig");
console.log(farmAnimals[0]); //print cat
console.log(farmAnimals[3]); // print pig

//NOT all array elements HAVE TO BE define when created
var arrLiteral = ["val1",,"val3"];
console.log(typeof arrLiteral[1]);// the second array element is undefined

// CREATE an array of several undefined elements, WE CAN GIVE IT THE LENGTH
var largeCollection = new Array(100); // a new array with 100 elements undefined
console.log(typeof largeCollection);
console.log(typeof largeCollection[40]);