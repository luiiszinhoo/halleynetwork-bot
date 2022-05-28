const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setmsgedit',
    aliases: ['sme'],

    run: async(client, message, args) => {

        let canallogsedit = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!message.member.permissions.has('MANAGE_GUILD')) {

            message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`Você não tem permissão para utilizar este comando!`)
                    .setColor('BLUE')
                ]
            })
        } else

        if (!canallogsedit) {
            message.reply({ embeds: [
                new Discord.MessageEmbed()
                    .setDescription(`\`!setmsgedit [canal]\``)
                    .setColor('BLUE')
                ]
            })
        } else {

        db.set(`channelLogseditmsg_${message.guild.id}`, canallogsedit.id);

        message.reply({ embeds: [
            new Discord.MessageEmbed()
                .setDescription(`✅ | O canal ${canallogsedit} foi configurado no servidor!`)
                .setColor('BLUE')
            ]
        })
    }

    }
}

