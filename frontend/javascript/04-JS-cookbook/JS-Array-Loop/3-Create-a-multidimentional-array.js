// set array length
var arrayLength = 3;

//create array
var multiArray = new Array(arrayLength);
for (var i = 0; i < multiArray.length;i ++) {
  multiArray[i] = new Array(arrayLength);
}

// add items to first arry index
multiArray[0][0] = "apple";
multiArray[0][1] = "banana";
multiArray[0][2] = "cherry";

// second
multiArray[1][0] = 2;
multiArray[1][1] = 585;
multiArray[1][2] = 5425;

//third
multiArray[2][0] = ['test','again'];
multiArray[2][1] = ['Java','script'];
multiArray[2][2] = ['read', 'books'];

console.log(multiArray);
console.log(multiArray[2]);
console.log(multiArray[2][2][0]);


var table = new Array(3);

table[0] = [45.89, 4,34, 75, 78]; // first row
table[1] = [3, 23, 99, 43, 2]; //second row
table[2] = [1, 2, 4, 0, 56]; //third row

console.log(table);
