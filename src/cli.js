#!/usr/bin/env node
const argv = require('yargs')
    .commandDir('commands')
    .help('help')
    .alias('help', 'h')  
    .argv;

// if (argv.type === 'totp') {
//     console.log(totp(argv.key));
// } else {
//     console.log('Invalid type');
// }