


var extend = require('aux.js/object/extend');

module.exports = function (repl)
{
	var context = repl.context;

	var aux = context.aux = require('aux.js');

	/* fn */
	extend(context, aux.fn);

	context.noop = aux.noop;
	context.identity = aux.identity;
	context.expr = aux.expr;

	context.inst = aux.inst;

	context.prop = aux.prop;

	/* aux.array */
	context.cat = aux.array.cat;
	context.uniq = aux.array.uniq;

	/* aux.object */
	context.keys = aux.object.keys;
}
