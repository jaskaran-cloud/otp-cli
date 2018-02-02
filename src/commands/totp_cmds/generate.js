const getTotp = require('../../util/getTotp.js')

exports.command = 'generate';
exports.desc = 'Generates a new totp';
exports.builder = {
  key: {
    alias: 'k',
    description: 'Secret key',
    type: 'string',
    demand: true,
  }
};

exports.handler = (argv) =>  {
  console.log(getTotp(argv.key));
};
  