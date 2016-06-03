

var
	cat = require('aux.js/array/cat'),
	unary = require('aux.js/fn/unary'),

	colors = require('cli-color'),
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
	line(' — Node.js REPL with promise support & CLI module requiring.'),
	line(),
	line('repl.js [options] [module, ...]'),
	line(),
	line(bold('options'), ':'),
	line(pad(), option('--eval', '-e "<script>"', 'eval script')),
	line(pad(), option('--file', '-f <file>', 'eval file')),
	line(pad(), option('--print', '-p', 'eval script or file and print result')),
	line(pad(), option('--quit', '-q', 'do not enter interactive mode after eval')),
	line(pad(), option('--clean', 'start repl without utilities')),
	line(pad(), option('-?', '-h', '--help', 'show brief help')),
	line(pad(), option('-v', '--version', 'show repl.js version'))
));
