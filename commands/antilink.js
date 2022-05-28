const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
    
    name: "AntiLink",
    author: "luisera#1239",

    run: async(client, message, args) => { 

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Você não possui este tipo de permissão!`)

        if (!args[0] || args[0] !== "on" && args[0] !== "off") message.reply(`Ative o sistema com \`!antilink on\`.\nDesative o sistema com \` !antilink off\`.`)

        if (args[0] === "on") {
        
            db.set(`antilink_${message.guild.id}`, "on");
            message.reply(`O sistema foi ativado com sucesso!`);

        };

        if (args[0] === "off") {

            db.set(`antilink_${message.guild.id}`, "on");
            message.reply(`O sistema foi desativado com sucesso!`);

        }
    
    }
}