var elemArray = new Object();//notice Object , NOT elemArray\
var elem = document.forms[0].elements[0];
elemArray[elem.id] = elem.value;

for (var key in elemArray) {
  str+=key + "," + elemArray[key] + " ";
}