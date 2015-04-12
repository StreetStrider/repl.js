# repl.js
> Node.js interactive REPL with promise support & CLI module requiring.

This module is a drop-in replacement for node std `repl`. Can be used as shell & via API.

## features
### on-start requiring
Specify modules (with optional aliases) you want to be loaded into REPL onstart.
```sh
$ repl.js path lodash Promise=bluebird ./local_file.js file=./another_local_file.js
```

### useful utils
In REPL some features are loaded automatically:
* Colored console via `console` ([console-ultimate](https://www.npmjs.com/package/console-ultimate)).
* Colors via `colors` ([cli-color](https://www.npmjs.com/package/cli-color)).
* Common-use utilities from aux.js, functional stuff ([aux.js](https://www.npmjs.org/package/aux.js)).
* Partially-applicated `log` function via `plog`.
* Function's signatures and source code via `signature` (alias `sg`) and `sourceCode` (alias `src`).
* `dir` function for navigating objects.

### clean environment
If you do not want anything to be loaded into REPL, pass `--clean` option.
```sh
$ repl.js --clean
```

## stable channel
For now v1 is stable, you can install in via npm: `npm i repl.js`, or from `v1` git-branch.
v2 (`master`) is in active development. Once it fulfills all wanted features from v1 and fixes several minor issues, it will be released at npm.

## todo (v2)
In progress:
* [x] require alias=module onstart
* [ ] @r, @dir, @off, @log, @sg, @src
* [ ] thenable
* [ ] `node -p -e`
* [ ] `node <script.js>` + interactivity by default (run module in repl's context)
* [ ] `node -v`

## license
MIT.
© StreetStrider, 2013 — 2015.
