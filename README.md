# repl.js
> Node.js interactive REPL with promise support & CLI module requiring.

This module is a drop-in replacement for node std `repl`. Can be used as shell & via API.

## features
### on-start requiring
Specify modules (with optional aliases) you want to be loaded into REPL onstart.
```sh
$ repl.js path lodash Promise=bluebird ./local_file.js file=./another_local_file.js
```

### promises
When evaling returns promise, it will not be outputted in «raw view» (like `{ then: … }`), instead REPL will await for it fulfilling.

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
* [ ] `node -p -e` for executing script and enter interactive mode
* [ ] `node <script.js>` + interactivity by default (run module in repl's context)
* [x] require alias=module onstart
* [x] thenable

## license
MIT.
© StreetStrider, 2013 — 2015.
