


var
	vm = require('vm'),
	Promise = require('promise');

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
			isSlow;

		var util = require('util');
		var color = console.colors[util.inspect.styles.special];

		function enterPromise ()
		{
			//console.info('enter promise');
			slowIndicator = setTimeout(function ()
			{
				isSlow = true;
				//console.warn('it isSlow');
				console.writer.writeln('stdout', color('[Promise]'));
			}, slowThrs);
		}
		function leavePromise ()
		{
			clearTimeout(slowIndicator);
			//console.info('leave promise');
			if (isSlow)
			{
				//console.warn('was isSlow = true');
				//console.warn('_ must clear here');
				console.writer.write('stdout', console.colors.move.up(1));
				console.writer.write('stdout', console.colors.erase.line);
			}
		}
	}

	return evaler;
}
