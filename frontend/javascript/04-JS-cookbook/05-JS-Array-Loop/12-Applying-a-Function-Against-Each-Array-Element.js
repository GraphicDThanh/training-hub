// Use forEach()
var charSets = new Array("ab","bb","cd","ab","cc","ab","dd","ab");

function replaceElement(element,index,array) {
  if(element == "ab") array[index] = "**";
}

//apply function to each array element
charSets.forEach(replaceElement);
console.log(charSets);

//IE8 does not support forEach