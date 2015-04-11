


var uconsole = module.exports = {};

var
	local = require('./req').local,
	Console = local('console-ultimate');

uconsole.stream = function (options)
{
	return options.outputStream || process.stdout;
}

uconsole.console = function (options)
{
	var stream = uconsole.stream(options);

	return Console(stream, stream);
}

uconsole.inRepl = function (repl, console)
{
	var context = repl.context;

	local('console-ultimate/global').replaceAt(context, console);
}
