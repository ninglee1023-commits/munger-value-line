const fs = require('node:fs');
const { marked } = require(process.argv[2]);
const source = fs.readFileSync(process.argv[3], 'utf8').replace(/^\uFEFF/, '');
process.stdout.write(JSON.stringify(marked.lexer(source, {gfm: true, breaks: false})));
