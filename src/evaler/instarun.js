


var
	local = require('../req').local,

	clc   = local('cli-color'),
	erase = clc.move.up(1) + clc.erase.line;

module.exports = function (instance, console, instantRun)
{
	if (instantRun.eval)
	{
		evalString(instance, console, instantRun.eval);
	}
}

function evalString (instance, console, string)
{
	/* instance.clearLine(); */
	//console.writer.write('stdout', erase);

	/* instance.eval(string, instance.context, 'repl', new Function); */
	instance.eval(string, instance.context);
	instance.displayPrompt();
}
