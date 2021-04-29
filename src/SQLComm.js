const utils = require("./Utils");

class SQLComm {
    connected = false;
    sql = require('mssql');
    config = utils.readJSONFile('sqlConfig.json');

    constructor(){
        this.connect();
    }

    async connect(){
        try {
            this.pool = await this.sql.connect(this.config);
            console.log("SQL Connected");
        } catch (err) {
            console.log(err);
        }
    }

    async createUserTable() {
        console.log("Creating User Table");
        let query = `        
        CREATE TABLE [dbo].[User](
            [UserID] [int] NOT NULL identity primary key,
            [ActiveCampaignID] [int] NULL
                CONSTRAINT FK_User_Campaign FOREIGN KEY (ActiveCampaignID)
                REFERENCES Campaign (CampaignID)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            [ActiveCharacterID] [int] NULL
                CONSTRAINT FK_User_Character FOREIGN KEY (ActiveCharacterID)
                REFERENCES Character (CharacterID)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            [UserDiscordID] [nvarchar](max) NOT NULL)
        `;

        await this.pool.query(query);
    }

    async addUser(discordID) {
        let query = `insert into [User] (UserDiscordID) values (${discordID})`;
        
        await this.pool.query(query);
    }

    async getUserByDiscordID(discordID) {
        let query = `select * from [User] where UserDiscordID = ${discordID}`;

        let results = await this.pool.query(query);

        let foundUser = results.recordset[0];
        return foundUser;
    }
};

module.exports.SQLComm = SQLComm;