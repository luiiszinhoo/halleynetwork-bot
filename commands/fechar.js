const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "ticket_menu",
    author: "luisera#1239",

    run: async(client, message, args) => {

        if (message.member.permissions.has("ADMINISTRATOR")) {

            message.channel.delete().catch(error => {});

        };

        if (message.channel.name !== message.author.id) {
            message.reply(`Você não pode utilizar este comando aqui.`);

    }
    else
    if (message.channel.name === message.author.id) {


    message.channel.delete().catch(error => {})       
    

    }
    else
    { return; }


} 
} 