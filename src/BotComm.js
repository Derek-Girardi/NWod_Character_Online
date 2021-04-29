const utils = require("./Utils");

class BotComm {
    Discord = require('discord.js');
    config = utils.readJSONFile('botConfig.json');

    constructor(commandManager) {
        this.commandManager = commandManager;

        this.client = new this.Discord.Client();
        
        this.client.once('ready', this.onReady.bind(this));
        this.client.on('message', this.onMessage.bind(this));
        this.client.login(this.config.token);
    }

    onReady() {
        console.log('Discord Bot initialized');
    }

    async onMessage(message) {
        try {
            if(message.content.startsWith('|')) {
                let messageBody = message.content.slice(1);
                let result = await this.commandManager.runDiscordCommand(message, messageBody);

                if (result)
                    message.channel.send(result);
            }
        } catch (ex) {
            message.channel.send('Error reading command');
            console.log(ex);
        }
    }
}

module.exports.BotComm = BotComm;