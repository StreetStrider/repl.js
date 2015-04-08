


var
	Console = require('console-ultimate');

module.exports = function (repl)
{
	var
		context = repl.context,
		output  = repl.outputStream;

	var console = Console(output, output);

	require('console-ultimate/global').replaceAt(context, console);
}
