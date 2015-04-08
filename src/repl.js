

var std = require('repl');

var repl = module.exports = {};

repl.start = function ()
{
	var instance = std.start({
		prompt: 'js >',
		useGlobal: true,
		ignoreUndefined: true
	});

	// console.log(instance.context == global);

	return instance;
}

repl.start();
