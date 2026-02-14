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
} )

client.on("messageCreate", (message)=> {
    // console.log(`message received: ${message.content}`)
    // console.log(message.author)

    const isBot = message.author.bot;
    if(isBot)return;

    message.reply("Hello, How i can asist you?") 
    

})




client.login(process.env.DISCORD_BOT_TOKEN)