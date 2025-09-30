// Use JS Array witth push() method to add itemsto the queue and shilt() to retrieve

// create a new Array
var queue = new Array();

// push on three entries
queue.push('first');
queue.push('second');
queue.push('third');

// shift two entries = trich xuat 2 phan tu theo thu tu FIFO = First-in-First-out
console.log(queue.shift()); // return first
console.log(queue.shift()); // return second
console.log(queue); // array chi con 1 phan tu cuoi cung

