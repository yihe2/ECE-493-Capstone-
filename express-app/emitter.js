const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
module.exports = myEmitter;