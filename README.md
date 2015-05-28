# repl.js
> Node.js REPL with promise support & CLI module requiring.

This module is a drop-in replacement for node std `repl`. Can be used as shell & via API.

## features
### on-start requiring
Specify modules (with optional aliases) you want to be loaded into REPL onstart.
```sh
$ repl.js path lodash Promise=bluebird ./file.js file=./other_file.js
```

### execute & enter interactive
Supply script of filename to execute. After executing REPL will be started with script's results.
```sh
# execute script and inspect in results in interactive mode
$ repl.js -e 'var x = 1;'

# execute file
$ repl.js -f script.js
```
If you just want execute script and do not enter interactive mode (just like `node` do), you can pass `-q` option.

### promises
When evaling returns promise, it will not be outputted in «raw view» (like `{ then: … }`), instead REPL will await for its fulfilling.

### robust require
All modules are resolved relatively to workdir which REPL was started, and not relatively to REPL source files. So you can start repl from your project's directory and retrieve modules you need with proper versions.

### useful utils
In REPL some features are loaded automatically:
* Colored console via `console` ([console-ultimate](https://www.npmjs.com/package/console-ultimate)).
  * Take a moment to look through console-ultimate's features. It has support for hi-res timers, better stack traces, tables, grouping and neat coloring by default.
* Colors via `colors` ([cli-color](https://www.npmjs.com/package/cli-color)).
* Common-use utilities from aux.js, functional stuff ([aux.js](https://www.npmjs.org/package/aux.js)).
  * Many of functions are inserted directly in `global`, use `dir()` to inspect them.
* Partially-applicated `log` function via `logpart`.
* Function's signatures and source code via `signature` (alias `sg`) and `sourceCode` (alias `src`).
* `dir` function for navigating objects (enums, not-enums, own, from prototype chain).

### clean environment
If you do not want utilities to be loaded into REPL, pass `--clean` option.
```sh
$ repl.js --clean
```

## todo (v2)
For now `v2` is stable and installed by default. Some features are still in progress:
* [ ] per-expressing directives to modify eval process @r, @dir, @off, @log, @sg, @src
* [x] `node -p -e <"expr">` + enter interactive mode
* [x] `node -p -f <script.js>` + enter interactive mode
* [ ] teach stdin?
* [x] require alias=module onstart
* [x] thenable

## license
MIT.
© StreetStrider, 2013 — 2015.
