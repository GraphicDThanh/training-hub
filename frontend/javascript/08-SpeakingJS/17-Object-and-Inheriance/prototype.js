// Sharing Data Between Object Via a Prototype
// avoid do that
// both them contain same method describe()
var jane = {
  name: 'Jane',
  describe: function() {
    return 'Person named' + this.name;
  }
};

var tarzan = {
  name: 'Tazan',
  describe: function() {
    return 'Person named' + this.name;
  }
}

// share data
var PersonProto = {
  describe: function() {
    return 'Person named:' + this.name;
  }
};

var jane = {
  [[Prototype]]: PersonProto,
  name: 'Jane'
};

var tazan = {
  [[Prototype]]: PersonProto,
  name: 'Tarzan'
}

// Getting and Setting the Prototype
// verbose
var PersonProto = {
  describe: function () {
    return 'Person named' + this.name;
  }
};
var jane = Object.create(PersonProto, {
  name: { value: 'Jane', writable: true };
});

// shorter
var jane = Object.create(PersonProto);
jane.value = 'Jane';

// Reading property of an object
Object.getPrototypeOf(jane) === PersonProto; // true

// Checking whether one object a prototype of another one
var A = {};
var B = Object.create(A);
var C = Object.create(B);
A.isPrototypeOf(C); // true
C.isPrototypeOf(A); // false

// Finding the object where a property is defined
function getDefiningObject(obj, propKey) {
  obj = Object(obj); // make sure it's an object
  while (obj && !{}.hasProperty.call(obj, propKey)) {
    obj = Object.getPrototypeOf(obj);
    // obj is null if we have reached the end
  }
}

// list all property keys with function implement
function getAllPropertyNames(obj) {
  var result = [];
  while (obj) {
    // add the own property names of 'obj' to 'result'
    Array.prototype.push.apply(result, Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj);
  }

  return result;
}

// Best practice: Iterating over Own Properties
// Combine for-in with hasOwnProperty()
for (var key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    console.log(key);
  }
}

//Combine Object.keys() or Object.getOwnPropertyNames() with forEach() array iteration
var obj = { first: 'John', last: 'Done' };
// Visit non-inherited enumerable keys
Object.keys(obj).forEach(function(key) {
  console.log(key);
});