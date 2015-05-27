


var
	vm = require('vm'),

	local = require('../req').local,
	Promise = local('promise'),

	specialColor = require('util').inspect.styles.special,
	clc = local('cli-color'),
	color = clc[specialColor],
	erase = clc.move.up(1) + clc.erase.line;

module.exports = function Evaler (options, console)
{
	var
		vmEvaler,
		noDisplay = { displayErrors: false },
		slowThrs  = 350;


	if (options.useGlobal)
	{
		vmEvaler = function (script)
		{
			return script.runInThisContext(noDisplay);
		}
	}
	else
	{
		vmEvaler = function (script, context)
		{
			return script.runInContext(context, noDisplay);
		}
	}

	return function (code, context, filename, callback)
	{
		try
		{
			var script = new vm.Script(code, {
				filename: filename,
				displayErrors: false
			});
		}
		catch (e)
		{
			/* don't know what actually I did */
			if (code !== '.scope')
			{
				console.error(e);
			}
			return callback();
		}

		new Promise(function (rs, rj)
		{
			enterPromise();
			rs(vmEvaler(script, context));
		})
		.then(ok, error);

		function ok (result)
		{
			leavePromise();
			callback(null, result);
		}
		function error (error)
		{
			leavePromise();
			console.trace(error);
			callback();
		}

		var
			slowIndicator,
			isSlow,
			isIntercepted;

		function enterPromise ()
		{
			slowIndicator = setTimeout(function ()
			{
				isSlow = true;
				console.writer.writeln('stdout', color(' [Promise…]'));
				console.writer.transform(interceptor);
			}, slowThrs);
		}
		function leavePromise ()
		{
			clearTimeout(slowIndicator);
			if (isSlow)
			{
				console.writer.transform.pop();

				if (! isIntercepted)
				{
					console.writer.write('stdout', erase);
				}
				else
				{
					console.writer.writeln('stdout', color(' [Promise resolved]:'));
				}
			}
		}

		function interceptor (_)
		{
			isIntercepted = true;
			return _;
		}
	}

	return evaler;
}
