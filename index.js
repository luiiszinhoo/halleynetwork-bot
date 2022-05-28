const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const config = require("./config.json"); 
const db = require("quick.db");
const Timeout = new Set();


client.login(config.token); 

client.once('ready', async () => {

const activites = [
    `Jogando o Luisera na frente do carro`,
    `Eu morro fazendo ponte no BedWars`,
    `Acesse: jogar.halleynetwork.com.br`,
    `Doe e ajude o servidor: loja.halleynetwork.com.br`,
    `Meu nome é Halley mas alguns me chamam de Senhor Kbça de TV`
]
    setInterval(()=>{ 
    const status = activites[Math.floor(Math.random()*activites.length)]
    client.user.setPresence( { activities : [{name : `${status}`}]})

    }, 60000)
    console.log("✅ - Estou online!")

})



client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on('messageCreste', async (message) => {

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let verificando = db.get(`antilink_${message.guild.id}`);
    if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

    if (verificando === "on") {

        if (message.member.permissions.has("MANAGE_GULD")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;
        
        if (message.content.includes("mc.skycraft.com.br".toLowerCase() || "hypixel.net".toLowerCase() || "mush".toLowerCase() || "mushmc.com".toLowerCase() || "skycraft".toLowerCase() || "hylex".toLowerCase() || "mushmc.com.br".toLowerCase() || "mushmc.com.br".toLowerCase())) {

        message.delete();
        message.channel.send(`${message.author} Você não pode enviar este tipo de mensagem!`)

        }

    }
})

client.on("guildMemberAdd", async (member) => {

    let cargo = member.guild.roles.cache.get("977807527104368690");  // Procurando cargo no servidor.

    if (!cargo) return console.log(`O cargo configurado no script, não existe no servidor ${member.guild.name}.`); // Verificando se o cargo existe.

    try {
        member.roles.add(cargo.id) // Enviando o cargo para o usuário.
    } catch (e) {
        console.log("Autorole:\n"+e) // Enviando erros ao console.
    }

})

client.on("messageDelete", async (message) => {

    let channelDellogs = db.get(`channelLogs_${message.guild.id}`);
    if (channelDellogs === null) return;

    if (message.author.bot) return;

    let user1 = message.author;
    let channel2 = message.channel;
    let msgDelete = message.content;

    let embed = new Discord.MessageEmbed()
        .setTitle(`🗑 Mensagem excluída`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `Autor da mensagem:`,
                value: `${user1}`,
                inline: false,
            },

        )
        .addFields(
            {
                name: `Canal:`,
                value: `${channel2}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `Mensagem:`,
                value: `\`\`\`${msgDelete}\`\`\``,
                inline: false,
            }
        )
        .setTimestamp()
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

        try {

    message.guild.channels.cache.get(channelDellogs).send({ embeds: [embed] })

        } catch (e) { }
});

client.on("messageUpdate", async (message, oldMessage) => {

    let setlogsmsgenv = db.get(`channelLogseditmsg_${message.guild.id}`);
    if (setlogsmsgenv === null) return;

    if (message.author.bot) return;

    let msgchannel = message.channel;
    let msgantiga = message.content;
    let msgeditada = oldMessage.content;

    let embed = new Discord.MessageEmbed()
        .setTitle(`📝 Mensagem editada`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `Autor da mensagem`,
                value: `${message.author}`,
                inline: false,
            },
        )

        .addFields(
            {
                name: `Canal`,
                value: `${msgchannel}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `Mensagem antiga`,
                value: `\`\`\`${msgantiga}\`\`\``,
                inline: false
            },
        )
        .addFields(
            {
                name: `Mensagem editada`,
                value: `\`\`\`${msgeditada}\`\`\``,
                inline: false,
            }
        )
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })

    message.guild.channels.cache.get(setlogsmsgenv).send({ embeds: [embed] })
});



client.on("interactionCreate", async (interaction) => {

    if (interaction.channel.type === "dm") return;
  
    if (interaction.isCommand()) {

        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);

 const { owners } = require("./config.json");
 if (cmd) {
  if (cmd.ownerOnly) {
 if (!owners.includes(interaction.user.id)) {
 let ownerOnly = new Discord.MessageEmbed()
  .setDescription( "*Somente meu dono pode usar isso!*" )
  return interaction.followUp({embeds : [ownerOnly] });
 }}
 }
        if (!cmd)
            return interaction.followUp({ content: "Ixi, muitos erro poucas soluções" });

        const args = [];



        for (let option of interaction.options.data) {


            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
   

        cmd.run(client, interaction, args);
    }


    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
        
    }
});