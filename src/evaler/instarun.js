


var
	local = require('../req').local,

	clc   = local('cli-color'),
	erase = /*clc.move.up(1) +*/ clc.erase.line;

module.exports = function (instance, console, instantRun)
{
	if (instantRun.eval)
	{
		evalString(instance, console, instantRun.eval);
	}

	function evalString (instance, console, string)
	{
		/* instance.clearLine(); */
		// clear();

		instance.eval(string, instance.context, 'repl', done);
	}

	function done (_, value)
	{
		if (instantRun.print)
		{
			//clear();
			writeln(value);
		}
		instance.displayPrompt();
	}

	function clear ()
	{
		console.writer.write('stdout', erase);
	}
	function writeln (value)
	{
		console.writer.writeln('stdout', instance.writer(value));
	}
}
