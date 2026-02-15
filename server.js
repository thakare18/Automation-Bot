require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');


const client = new Client ({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,// server messages only info 
        GatewayIntentBits.MessageContent// content of the messages 
    ]
})

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function generateImage(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });


    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            return buffer;
        }
    }
}

async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
}
    




client.once("clientReady", () => {
    console.log("Bot is ready!");
} )

client.on("messageCreate", async (message)=> {
    // console.log(`message received: ${message.content}`)
    // console.log(message.author)

    const isBot = message.author.bot;
    if(isBot)return;

    const content = await generateContent(message.content);
    if(content){
        message.reply(content);
    }

})




client.login(process.env.DISCORD_BOT_TOKEN)