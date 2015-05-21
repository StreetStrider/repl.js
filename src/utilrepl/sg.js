


var
	local = require('../req').local,

	bold = local('cli-color').bold;

var
	re = /^(function(?:[^{]*))({[\s\S]*)/;

module.exports = function (repl, console)
{
	var context = repl.context;

	var sg = context.sg = context.signature = function signature (fn, isBodyToo)
	{
		if (typeof fn !== 'function')
		{
			return notAFunction();
		}

		var
			view  = fn.toString(),
			match = re.exec(view),
			out;

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

			console.group();
			console.writer.writeln('stdout', out);
			console.group.end();
		}
		else
		{
			notAFunction();
		}
	}

	context.src = context.sourceCode = function sourceCode (fn)
	{
		sg(fn, true);
	}

	function notAFunction ()
	{
		console.error('Does not look like a function.');
	}
}
