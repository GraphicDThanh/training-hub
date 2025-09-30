// Use filter() method
function removeChars(element,index,array) {
  return (element !== "**");
}

var charSet = new Array("**","bb","dd","**","cc","dd","**");
var newArray = charSet.filter(removeChars);
console.log(newArray);// bb,cd,cc,dd
//NOT SUPPORT IE8

//there is a way to emulate the filter method using Array.prototype.
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) {
          var val = this[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, this)) res.push(val);
        }
      }
    return res;
  };
}

// DON'T CLEAR YET