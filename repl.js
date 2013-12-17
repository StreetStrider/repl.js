#!/usr/bin/env node

global.repl = require('./src/repl').start(process.argv.slice(2));
