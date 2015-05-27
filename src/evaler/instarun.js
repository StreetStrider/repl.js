


var
	local = require('../req').local,
	clc   = local('cli-color');

module.exports = function (instance, console, argopts)
{
	if (argopts.eval)
	{
		evalString(instance, console, argopts.eval);
	}

	function evalString (instance, console, string)
	{
		/* instance.clearLine(); */
		// clear();

		instance.eval(string, instance.context, 'repl', done);
	}

	function done (_, value)
	{
		if (argopts.print)
		{
			clearBeforeOutput();
			output(value);
		}
		instance.displayPrompt();
	}

	function clearBeforeOutput ()
	{
		_write(clc.erase.line);
		_write('\n');
		_write(clc.move.up(1));
	}

	function output (value)
	{
		console.writer.writeln('stdout', instance.writer(value));
	}
	function _write (string)
	{
		console.writer.write('stdout', string);
	}
}
