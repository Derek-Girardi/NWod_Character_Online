class CommandManager {
    constructor(sqlComm) {
        this.sqlComm = sqlComm;
    }

    async runDiscordCommand(discordMessage, messageBody){
        let user = await this.sqlComm.getUserByDiscordID(discordMessage.author.id);
        if (!user) {
            discordMessage.channel.send(`Hello ${discordMessage.author.username}, nice to meet you`);
            await this.sqlComm.addUser(discordMessage.author.id);
            user = await this.sqlComm.getUserByDiscordID(discordMessage.author.id);
        }

        let commandName = messageBody.split(' ')[0];
        let command = this.commands[commandName];
        if (command == null) {
            return 'Unrecognized Command';
        }
        let commandData = command.parseCommand(messageBody.slice(commandName.length + 2));
        let commandResponse = command.execute(user, commandData);
        if (commandResponse) {
            return commandResponse;
        }
    }

    _parseCommand(command, messageBody) {
        return this.commands[command].parseCommand(messageBody);
    }

    _execute(command, user, commandData) {
        return this.commands[command].execute(user, commandData);
    }

    commands = {
        roll: {
            parseCommand: function(messageBody) {
        
            },
            execute: function(user, commandData) {
        
            }
        },
        makeCampaign: {
            parseCommand: function() {
        
            },
            execute: function(user, commandData) {
        
            }
        }        
    }
}

module.exports.CommandManager = CommandManager;