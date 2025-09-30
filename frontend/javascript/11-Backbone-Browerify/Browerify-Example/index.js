// require the core node events module
var EventEmitter = require('events').EventEmitter;

// Create a new event emitter
var emitter = new EventEmitter;

//emit an event
emitter.on('pizza', function(message) {
  console.log(message);
});

//emit an event
emitter.emit('pizza', 'pizza is extremely yummy');