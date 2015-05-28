


var
	req   = require('../req'),
	local = req.local,
	clc   = local('cli-color'),

	c = local('aux.js/fn/constrain'),
	read = c(require('fs').readFileSync, c, 'utf-8');

module.exports = function (instance, console, argopts)
{
	if (argopts.eval)
	{
		evalString(argopts.eval, done);
	}
	else if (argopts.file)
	{
		var
			filename = argopts.file,
			content  = read(filename);

		clearBeforeOutput();
		evalString(content, req.patchForFile(instance.context, filename, done));
	}

	function evalString (string, done)
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

		if (argopts.quit)
		{
			process.exit();
		}
		else
		{
			instance.displayPrompt();
		}
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
