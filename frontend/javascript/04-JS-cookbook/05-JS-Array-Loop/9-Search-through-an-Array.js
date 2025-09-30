// You want to search an array for a specific value and get the array element index if found
// Use indexOf() and lastIndexOf()
// the indexOf() return the first index found. the lastIndexOf() return the last index found

var animals = new Array("dog","cat","seal","elephant","walrus","hello","lion", "hello");
console.log(animals.indexOf("hello"));// print 5
console.log(animals.lastIndexOf("hello")); // print 9
// Both method can take a starting index, setting where the search is going to starting
console.log(animals.indexOf("hello",2));// print 5
console.log(animals.lastIndexOf("hello",3));// print -1

// IE8 doesn't support IndexOf() and lastIndexOf()
// fix for Mozilla

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from): Math.floor(from);
      if (from < 0)
        from += len;
      for (; from < len; from++) {
        if (from in this &&
        this[from] === elt)
        return from;
      }
    return -1;
  };
}