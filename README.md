# repl.js
> Node.js / io.js REPL with promise support & CLI module requiring.

This module is a drop-in replacement for node std `repl`. Can be used as shell & via API.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [features](#features)
  - [on-start requiring](#on-start-requiring)
  - [execute & enter interactive](#execute--enter-interactive)
  - [promises](#promises)
  - [robust require](#robust-require)
  - [useful utils](#useful-utils)
  - [clean environment](#clean-environment)
- [note for windows users](#note-for-windows-users)
- [license](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## features
### on-start requiring
Specify modules (with optional aliases) you want to be loaded into REPL onstart.
```sh
$ repl.js path lodash Promise=bluebird ./file.js file=./other_file.js
```
Here:
 * std module `path` will be loaded as `path`
 * node_modules `lodash` will be loaded as `lodash`
 * node_modules `bluebird` will be loaded as `Promise`
 * local file `./file.js` will be loaded as `file`
 * local file `./other_file.js` will be loaded as `file` and will overwrite previously loaded file

### execute & enter interactive
Supply script or filename to execute. After executing REPL will be started with script's results.
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

## note for windows users
Use `repljs` executable instead of `repl.js` in your `cmd`.

## license
MIT.
© StreetStrider, 2013 — 2015.
