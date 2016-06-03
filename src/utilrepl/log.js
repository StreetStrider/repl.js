

var
	cat     = require('aux.js/array/cat'),
	partial = require('aux.js/fn/partial');

module.exports = function (repl, console)
{
	var context = repl.context;

	context.log = console.log;
	context.logpart = context.plog = console.log.part;
}
