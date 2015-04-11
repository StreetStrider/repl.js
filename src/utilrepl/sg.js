


var
	local = require('../req').local,

	bold = local('cli-color').bold;

var
	re = /^(function(?:[^{]*))({[\s\S]*)/;

module.exports = function (repl)
{
	var
		context = repl.context,
		/* @todo: maybe log -> stream.write */
		log = context.console.log;

	var sg = context.sg = context.signature = function signature (fn, isBodyToo)
	{
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

			log(out);
		}
	}

	context.src = context.sourceCode = function sourceCode (fn)
	{
		sg(fn, true);
	}
}
