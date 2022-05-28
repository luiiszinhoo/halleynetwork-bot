module.exports =  {
    name: "unban",
    description: "Desbani um antigo membro",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            type: "STRING",
            description: "Qual usuário deseja desbanir?",
            required: true
            
            },
    
    
    ],
    
    
    run: async (client, interaction, args) => {
        if (!interaction.guild) return interaction.followUp({ content: "Esse comando deve ser usado somente em um server" });
        let user = interaction.options.getString("user");
    
    
        
        if(user.id == interaction.user.id) return interaction.followUp({content: `Você não pode se banir!`});
    if(user.id == interaction.guild.me.id) return interaction.followUp({content: `Você não pode me banir!`});
    if(user.id == interaction.guild.ownerId) return  interaction.followUp({content: `Você não pode banir o dono do server!`});
    
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({content: `Você não tem perm para isso!`});
    if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.followUp({content: `Eu não tenho perm para isso!`});
    
           const b = await interaction.guild.bans.fetch()
        const member = b.find((x) => x.user.id === user || x.user.tag === user || x.user.username === user)
        
        if(!member) return interaction.followUp(`Esse membro não está banido`)
    interaction.followUp({content: `${member.user} foi desbanido!`})
      await interaction
    .guild.bans.remove(member.user.id)
    
    
    
    
    }
    }