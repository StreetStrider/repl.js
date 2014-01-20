# repl.js
Replacement for node std `repl`.
Can be used in shell & programmatically.

## as shell
Modules can be simply required onstart.
Custom prompt: `js >`
Undefined values is ignored.

```sh
$ repl.js Q=q fs ./src/parseArgs # load npm, std & local module
Loaded `q`(q) as `Q`.
Loaded `fs`(fs) as `fs`.
Loaded `./src/parseArgs`(./src/parseArgs) as `parseArgs`.
js > 
```

Smart promise-like objects rendering.
```sh
$ repl.js Q=q # load Q library for promises
Loaded `q`(q) as `Q`.
js > Q.delay(500).then(function () { return 'result'; });
[Promise: resolved]
'result'
js > 
```

Built-in utilities and functools:

* `logAs(name)` — factory for console.log loggers
* `log` — short-cut for `console.log`
* `keys` — short-cut for `Object.keys`
* `signature(fn)` (also `sg`) — output function signature
* `signature(fn, true)` — output function signature and source-code
* `dir(object)` — inspect objects
* `dir$(object)` — deep inspect objects
* `constant(c)`  — factory for constants
* `same` — return same value (identity-function)
* `noop` — do noting

## other libraries & tools
Thanks to [LoDash](lodash.com/) (https://github.com/lodash/lodash/),
great functools can be used (LoDash accessible via `L`, instead of `_`).

Thanks to [yamljs](https://github.com/jeremyfa/yaml.js) it is
possible to require YAML files (also `YAML` object with `JSON`-like methods available).

Thanks to [cli-color](https://github.com/medikoo/cli-color) for colorized output (accessible via `clc`).

## as module
```javascript
require('repl.js').start(options) // mimic std repl.start
require('repl.js').run(argv)      // shell-like start
```

## license
MIT.
© StreetStrider, 2013
