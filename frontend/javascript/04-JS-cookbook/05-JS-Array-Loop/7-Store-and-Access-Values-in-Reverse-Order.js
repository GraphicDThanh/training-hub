// LIFO = Last in First out

// create new array
var queue = new Array();

// push on three entries
queue.push('first');
queue.push('second');
queue.push('third');

//pop two entries
console.log(queue.pop()); // return third
console.log(queue.pop()); // return second
console.log(queue); // return first in array

