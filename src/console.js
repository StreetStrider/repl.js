


var
	local = require('./req').local,
	Console = local('console-ultimate');

module.exports = function (repl)
{
	var
		context = repl.context,
		output  = repl.outputStream;

	var console = Console(output, output);

	local('console-ultimate/global').replaceAt(context, console);
}
