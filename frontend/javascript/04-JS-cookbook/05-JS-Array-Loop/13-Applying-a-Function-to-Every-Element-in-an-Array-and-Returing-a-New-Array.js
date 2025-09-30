// you wan tto convert an array od decimal numbers into a new array with their hexa-decimal equivalents
// Use map() method


//function to convert decimal to hexa-decimal
function convertToHex(element,index,array) {
  return element.toString(16);
}

var dexArray = new Array(2,255,122,5,16,99);
var hexArray = dexArray.map(convertToHex);

console.log(hexArray);

//MUST RETURN VALUE WHEN USE MAP
//NOT SUPPORT IE8