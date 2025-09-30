// Use this when use with node.js install with npm
// // load the modern build
var _ = require('lodash');
// or a method category
var array = require('lodash/array');
// or a method
var chunk = require('lodash/array/chunk');

// Example about ARRAY implement function

//_.remove(array, [predicate=_.identity], [thisArg])
// Removes all elements from array that predicate returns truthy for and returns an 
// array of the removed elements. The predicate is bound to thisArg and invoked with
// three arguments: (value, index, array). 
// Arguments
// array (Array): The array to modify.
// [predicate=_.identity] (Function|Object|string): The function invoked per iteration.
// [thisArg] (*): The this binding of predicate.
// Returns
// (Array): Returns the new array of removed elements.
var array = [1,2,3,4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});
console.log(array);
// → [1, 3]
console.log(evens);
// → [2, 4]


// _.rest(array) and _.tail(array)
// gets all but the first element of array
console.log('the _.rest function of (1,2,3)', _.rest([1, 2, 3]));
// → [2, 3]
console.log('the _.tail function of (1,2,3)', _.tail([1, 2, 3]));
// → [2, 3]


// __.drop(array, [n=1])
// Creates a slice of array with n elements dropped from the beginning.
// Arguments
// array (Array): The array to query.
// [n=1] (number): The number of elements to drop.
// Returns
// (Array): Returns the slice of array.
// console.log('drop function do', _.drop([1,2,3]));
// → slice n=1 by default => [2,3]
console.log('drop function do', _.drop([1,2,3], 2));
// → slice n=2 => [3]
console.log('drop function do', _.drop([1,2,3], 5));
// → slice n=5 => []
console.log('drop function do', _.drop([1,2,3], 0));
// → slice n=0 => [1,2,3]

// _.flatten(array, [isDeep])
// Flattens a nested array. 
// If isDeep is true the array is recursively flattened, 
// otherwise it is only flattened a single level.
// Arguments
// array (Array): The array to flatten.
// [isDeep] (boolean): Specify a deep flatten.
// Returns
// (Array): Returns the new flattened array.
console.log('_flatten', _.flatten([1, [2, 3, [4]]]));
// using 'isDeep'
console.log('_flatten with isDeep', _.flatten([1, [2, 3, [4]]], true));


// _.initial(array)
// Gets all but the last element of array.
// Arguments
// array (Array): The array to query.
// Returns
// (Array): Returns the slice of array.
console.log('_initial function do:', _.initial([1,2,3,4,5,6,7,8]));


//_.uniq(array, [isSorted], [iteratee], [thisArg])
// Creates a duplicate-free version of an array, using SameValueZero 
// for equality comparisons, in which only the first occurence of each element is kept. 
// Providing true for isSorted performs a faster search algorithm for sorted arrays. 
// If an iteratee function is provided it is invoked for each element in the array to
//  generate the criterion by which uniqueness is computed. The iteratee is bound to 
// thisArg and invoked with three arguments: (value, index, array). 

// If a property name is provided for iteratee the created _.property style callback 
// returns the property value of the given element. 

// If a value is also provided for thisArg the created _.matchesProperty style 
// callback returns true for elements that have a matching property value, else false. 

// If an object is provided for iteratee the created _.matches style callback?
//  returns true for elements that have the properties of the given object, else false.

// Aliases
// _.unique

// Arguments
// array (Array): The array to inspect.
// [isSorted] (boolean): Specify the array is sorted.
// [iteratee] (Function|Object|string): The function invoked per iteration.
// [thisArg] (*): The this binding of iteratee.
// Returns
// (Array): Returns the new duplicate-value-free array.


console.log('function _.uniq do:',_.uniq([2, 1, 2]));
// → [2, 1]

// using `isSorted`
console.log('function _.uniq do with isSorted', _.uniq([1, 1, 2], true));
// → [1, 2]

// using an iteratee function
var iteratee = _.uniq([1, 2.5, 1.5, 2], function(n) {
  return this.floor(n);
}, Math);
console.log('function _.uniq do with iteratee function:', iteratee);
// → [1, 2.5]

// using the `_.property` callback shorthand
var property = _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
console.log(property);
// → [{ 'x': 1 }, { 'x': 2 }]


//_.sortedIndex(array, value, [iteratee=_.identity], [thisArg])
// If an object is provided for iteratee the created _.matches style 
// callback returns true for elements that have the properties of the given object, else false.

// Arguments
// array (Array): The sorted array to inspect.
// value (*): The value to evaluate.
// [iteratee=_.identity] (Function|Object|string): The function invoked per iteration.
// [thisArg] (*): The this binding of iteratee.
// Returns
// (number): Returns the index at which value should be inserted into array._.sortedIndex([30, 50], 40);
// → 1

_.sortedIndex([30, 50], 40);
console.log('_sortindex do:', _.sortedIndex([30, 50], 40));
// → 1

_.sortedIndex([4, 4, 5, 5], 5);
console.log('_sortindex do:', _.sortedIndex([4, 4, 5, 5], 5));
// → 2

var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };

// using an iteratee function
_.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
  return this.data[word];
}, dict);
// → 1

// using the `_.property` callback shorthand
_.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
// → 1
