


var uconsole = module.exports = {};

var Console = require('console-ultimate');

uconsole.stream = function (options)
{
	return options.outputStream || process.stdout;
}

uconsole.Console = function (options)
{
	var stream = uconsole.stream(options);

	return Console(stream, stream);
}

uconsole.inRepl = function (repl, console)
{
	var context = repl.context;

	require('console-ultimate/global').replaceAt(context, console);
}
