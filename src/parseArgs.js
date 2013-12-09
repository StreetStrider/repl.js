


var
	cwd  = process.cwd(),
	path = require('path');

module.exports = function parseArgs (context, modules)
{
	modules.forEach(function (module)
	{
		if (module.match(/^[a-zA-Z_][a-zA-Z01-9_-]*$/))
		{
			var moduleVar = varName(module);
			tryModule(context, moduleVar, module);
		}
		else
		{
			var match = module.match(/^([a-zA-Z_][a-zA-Z01-9_]*)=(.+)$/);
			if (match)
			{
				var
					moduleVar  = match[1],
					modulePath = path.join(cwd, match[2]);

				tryModule(context, moduleVar, modulePath);
			}
			else
			{
				var match = module.match(/([a-zA-Z_][a-zA-Z01-9_-]*)(\.[^\/]*)?$/);
				if (match)
				{
					var
						moduleVar  = varName(match[1]),
						modulePath = path.join(cwd, module);

					tryModule(context, moduleVar, modulePath);
				}
				else
				{
					console.warn('Cannot recognize module `'+ module +'`.');
				}
			}
		}
	});
};

function tryModule (context, moduleVar, modulePath)
{
	try
	{
		context[moduleVar] = require(modulePath);
		if (moduleVar === modulePath)
		{
			console.info('Loaded `'+ moduleVar +'`.');
		}
		else
		{
			console.info('Loaded `'+ modulePath +'` as `'+ moduleVar +'`.');
		}
	}
	catch (e)
	{
		console.error('Module `'+ modulePath +'` cannot be found.');
	}
}

function varName (moduleName)
{
	return moduleName.replace(/-/g, '_').replace(/[^a-zA-Z01-9_]/g, '');
}
