const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "ticket_menu",
    author: "ferinha",

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Apenas membros com a permissão de \`ADMINISTRADOR\`, poderão utilizar este comando.`);

        message.delete();

        let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Crie um ticket selecionando uma categoria abaixo:**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder('Clique aqui.') // Mensagem estampada
        .addOptions([
               {
                    label: 'Suporte Geral',
                    description: 'Está precisando de ajuda em algo?',
                    emoji: '🙋‍♂️',
                    value: 'geral',
               },
               {
                label: 'Vips & Cash',
                description: 'Está com algum problema com seu vip ou na reivindicação de seu prêmio?',
                emoji: '💰',
                value: 'vips',
               },
               {
                label: 'Parcerias',
                description: 'Saiba mais sobre nosso programa de parceria!',
                emoji: '🤟',
                value: 'parcerias',
               },
               {
                label: 'Erro no bot',
                description: 'Bip bip bop bop cabos soltos...',
                emoji: '🤖',
                value: 'bot',
               }
            ])

        );


        message.channel.send({ embeds: [embed], components: [painel] }).then(msg => {


            const filtro = (interaction) => 
            interaction.isSelectMenu()
      
          const coletor = msg.createMessageComponentCollector({
            filtro
          });
      

          coletor.on('collect', async (collected) => {

            let ticket = collected.values[0]
            collected.deferUpdate()




            if (ticket === "geral") {

                let embed_geral = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`**🙋‍♂️ Olá ${collected.user}, seu ticket foi criado na categoria \`Suporte Geral\`.**`);

                message.guild.channels.create(`${collected.user.id}`, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_halley) => {
        
                    chat_halley.send({ embeds: [embed_geral] }).then(msg => msg.pin() );
        
                });


            }



            if (ticket === "vips") {

                let embed_denuncias = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`**💰 Olá ${collected.user}, seu ticket foi criado na categoria \`Vipss\`.**`);

                message.guild.channels.create(`${collected.user.id}`, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_halley) => {
        
                    chat_halley.send({ embeds: [embed_denuncias] }).then(msg => msg.pin() );
        
                });
                
            }

            if (ticket === "parcerias") {

                let embed_parcerias = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`**🤟 Olá ${collected.user}, seu ticket foi criado na categoria \`Parcerias\`.**`);

                message.guild.channels.create(`${collected.user.id}`, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_halley) => {
        
                    chat_halley.send({ embeds: [embed_parcerias] }).then(msg => msg.pin() );
        
                });


            }


            if (ticket === "bot") {

                let embed_bot = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`**🤖 Olá ${collected.user}, seu ticket foi criado na categoria \`Erro no bot\`.**`);

                message.guild.channels.create(`${collected.user.id}`, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_halley) => {
        
                    chat_halley.send({ embeds: [embed_bot] }).then(msg => msg.pin() );
        
                });
                
            }


          })
                

        });

        

    }
}