const fs = require('fs');

function readJSONFile(fileName) {
    try {
        const data = fs.readFileSync(fileName);
        var result = JSON.parse(data);
        return result;
    } catch (err) {
        console.error(err)
    }
};

const commands = {
    roll: {
        parse: function(messageBody) {

        },
        execute: function(user, commandData) {

        }
    },
    makeCampaign: {
        parse: function() {

        },
        execute: function(user, commandData) {

        }
    },
    register: {
        parse: function(messageBody) {
            return {};
        },
        execute: function(user, commandData) {
            //talk to server
            return "User Registered";
        }
    }
}

class BotComm {
    Discord = require('discord.js');
    config = readJSONFile('botConfig.json');

    commands = {
        register: commands.register,
        roll: commands.roll,
        makeCampaign: commands.makeCampaign
    };

    constructor() {
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
                let commandName = message.content.slice(1).split(' ')[0];
                let command = this.commands[commandName];
                if (command == null) {
                    message.channel.send('Unrecognized Command');
                    return;
                }
                let commandData = command.parse(message.content.slice(commandName.length + 2));
                let commandResponse = command.execute(message.member, commandData);
                if (commandResponse) {
                    message.channel.send(commandResponse);
                }
            }
        } catch (ex) {
            message.channel.send('Error reading command');
        }
    }
}

const botComm = new BotComm();