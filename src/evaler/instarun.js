


var
	local = require('../req').local,

	clc   = local('cli-color'),
	erase = clc.move.up(1) + clc.erase.line;

module.exports = function (instance, console, instantRun)
{
	console.warn('something running');
	//instance.eval(instantRun.eval, instance.context, 'repl', new Function);
	//instance.clearLine();
	console.writer.write('stdout', erase);
	instance.eval(instantRun.eval, instance.context);
	instance.displayPrompt();
}
