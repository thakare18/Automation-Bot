require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');


const client = new Client ({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,// server messages only info 
        GatewayIntentBits.MessageContent// content of the messages 
    ]
})

client.once("ready", () => {
    console.log("Bot is ready!");
} );


client.login(process.env.DISCORD_BOT_TOKEN)