//Want access all element in an array
// ===> USE FOR

var animals = new Array("cat","dog","human","wale","seal");
var animalString = "";
for (var i = 0; i < animals.length; i++) {
  animalString += animals[i] + " ";
}

// console.log(animalString);

// want access some element specific
// ===> USE WHILE

var numArray = new Array(1,24,245,353,1,4,24,53,555);
var i = 0;
while (numArray[i] < 100) {
  console.log(numArray[i++]);
}//DON'T UNDERSTAND HERE!! Teh result is 1 24



var numArray = new Array(1,24,245,353,1,4,24,53,555);
for (var i = 0; i < numArray.length; i++) {
  while (numArray[i] < 100) {
    console.log(numArray[i++]);
  }
}

var numArray = new Array(1,24,245,353,1,4,24,53,555);
for (var i = 0; i < numArray.length; i++) {
  if(numArray[i] < 100) {
    console.log(numArray[i]);
  }
}