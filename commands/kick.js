const { GuildMember, Guild } = require("discord.js");
const { prefix } = require('../config.json');
module.exports = {
	name: 'kick',
    description: 'Kicka um usuario',
    args: true,
    guildOnly: true,
    usage: '[membro] [razao]',
    execute(message, args) {
        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        //if (!membro) return message.reply(`Mencione um usuario! ex.: \`\`${prefix}ban @membro [motivo]\`\``)
        if (membro === message.member) return message.reply(`Você nao pode kickar você mesmo.`)
     
        const motivo = args.slice(1).join(" ");
    //    if(!motivo){motivo = "Indefinido"}
        if (!motivo) return message.reply(`Escreva o motivo! ex.: \`\`${prefix}kick @membro [motivo]\`\``)
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Você precisa da permissao **Kickar Membros**.`)
        if (membro.hasPermission("KICK_MEMBERS")) return message.reply(`Não posso kickar esse membro pois ele possui a permissão: \`**Kickar Membros**\``)
     
        //const canal = "768092490837393468"
        //let canal = message.guild.member.cache.get('768092490837393468');
     
        message.reply(`Você realmente deseja kickar esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.send(`\`\`\`diff\n- MEMBRO KICKADO\n- Motivo: ${motivo}\`\`\``)
                membro.kick({reason: `${motivo}`});
            })
        })
    },
};