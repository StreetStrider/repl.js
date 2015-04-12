

var
	local = require('./req').local,

	cat = local('aux.js/array/cat'),
	unary = local('aux.js/fn/unary'),

	colors = local('cli-color'),
	bold = unary(colors.bold);

function line ()
{
	return cat(arguments).join('');
}

function lines ()
{
	return cat(arguments).join('\n');
}

function nl (str)
{
	return str + '\n';
}

function pad ()
{
	return '  ';
}

function header (str)
{
	return bold(str);
}

function option (opts, text)
{
	opts = cat(arguments);

	text = opts.slice(-1);
	opts = opts.slice(0, -1);

	opts = opts.map(bold);
	opts = opts.join(', ');

	return line(opts, ' — ', text);
}

module.exports = nl(lines
(
	line(header('repl.js')),
	line(' — Node.js interactive REPL with promise support & CLI module requiring.'),
	line(),
	line('repl.js [options] [module, ...]'),
	line(),
	line(bold('options'), ':'),
	line(pad(), option('--clean', 'start repl without utilities')),
	line(pad(), option('-h', '--help', 'show brief help')),
	line(pad(), option('-v', '--version', 'show repl.js version'))
));
