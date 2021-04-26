const { BotComm } = require('./src/BotComm');
const { CommandManager } = require('./src/CommandManager');
const { SQLComm } = require('./src/SQLComm');

const sqlComm = new SQLComm();
const commandManager = new CommandManager(sqlComm);
const botComm = new BotComm(commandManager);