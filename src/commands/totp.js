exports.command = 'totp <command>';
exports.desc = 'Operations on totp';
exports.builder = function getTotpCommands(yargs) {
  return yargs.commandDir('totp_cmds');
};
exports.handler = () => {};