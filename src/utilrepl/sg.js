


module.exports = function (repl, console)
{
	var context = repl.context;

	var sg = context.sg = context.signature = function signature (fn, isBodyToo)
	{
		var out = retrieve(fn, isBodyToo)

		if (! out)
		{
			return notAFunction()
		}

		console.writer.writeln('stdout', out)
	}

	context.src = context.sourceCode = function sourceCode (fn)
	{
		sg(fn, true)
	}

	function notAFunction ()
	{
		console.error('Does not look like a function.')
	}
}


var Re = /^(function(?:[^{]*))({[\s\S]*)/
var ReLambda = /(.+)=>([\s\S]*)/

var bold = require('cli-color').bold

var bordered = require('console-ultimate/src/bordered')
bordered = bordered(bordered.prefix)

var retrieve = module.exports.retrieve = function (fn, isBodyToo)
{
	if (typeof fn !== 'function')
	{
		return null
	}

	if (isLambda(fn))
	{
		re = ReLambda;
	}
	else
	{
		re = Re;
	}

	var view  = String(fn)

	var match = re.exec(view)
	var out

	if (match)
	{
		if (isBodyToo)
		{
			out = bold(match[1]) + match[2];
		}
		else
		{
			out = bold(match[1].trim());
		}

		out = bordered(out)

		return out
	}
	else
	{
		return 'doesn\'t look like a function…, regexp is not perfect (and cannot be), post an issue'
	}
}

function isLambda (fn)
{
	return fn.prototype == null
}
