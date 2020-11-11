const { GuildMember, Guild } = require("discord.js");
const { prefix } = require('../config.json');
module.exports = {
	name: 'ban',
    description: 'Ban um usuario',
    args: true,
    guildOnly: true,
    execute(message, args) {
        let membro = message.mentions.members.first() || mesage.guild.members.cache.get(args[0])
        //if (!membro) return message.reply(`Mencione um usuario! ex.: \`\`${prefix}ban @membro [motivo]\`\``)
        if (membro === message.member) return message.reply(`Você nao pode banir você mesmo.`)
     
        const motivo = args.slice(1).join(" ");
    //    if(!motivo){motivo = "Indefinido"}
        if (!motivo) return message.reply(`Escreva o motivo! ex.: \`\`${prefix}ban @membro [motivo]\`\``)
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Você precisa da permissao **Banir Membros**.`)
        if (membro.hasPermission("BAN_MEMBERS")) return message.reply(`Não posso banir esse membro pois ele possui a permissão: \`**Banir Membros**\``)
     
        //const canal = "768092490837393468"
        //let canal = message.guild.member.cache.get('768092490837393468');
     
        message.reply(`Você realmente deseja banir esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.send(`\`\`\`diff\n- MEMBRO BANIDO\n- Motivo: ${motivo}\`\`\``)
                membro.ban({reason: `${motivo}`});
            })
        })
    },
};