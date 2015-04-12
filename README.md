# repl.js
> Node.js interactive REPL with promise support & CLI module requiring.

This module is a drop-in replacement for node std `repl`. Can be used as shell & via API.

## stable channel
For now v1 is stable, you can install in via npm: `npm i repl.js@1`, or from `v1` branch.
v2 (`master`) is in active development. Once it fulfills all wanted features from v1 and fixes several minor issues, it will be released at npm.

## TODO (v2)
* [x] require alias=module onstart
* [ ] @r, @dir, @off, @log, @sg, @src
* [ ] thenable
* [ ] `node -p -e`
* [ ] `node <script.js>` + interactivity by default (run module in repl's context)
* [ ] `node -v`

## license
MIT.
© StreetStrider, 2013 — 2015.
