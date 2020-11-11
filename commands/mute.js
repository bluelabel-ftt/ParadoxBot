const { prefix } = require('../config.json');
module.exports = {
	name: 'mute',
    description: 'Muta um usuario',
    args: true,
    guildOnly: true,
    usage: '[membro] [razao]',
    execute(message, args) {

        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (membro === message.member) {
            return message.reply(`Você nao pode mutar você mesmo.`)
        }

        if (!args) return message.reply(`Escreva o motivo! ex.: \`\`${prefix}mute @membro [motivo]\`\``);
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`Você precisa da permissao **Mutar Membros**.`);
        if (membro.hasPermission("MUTE_MEMBERS")) return message.reply(`Não posso mutar esse membro pois ele possui a permissão: \`**Mutar Membros**\``);
        

        message.reply(`Você realmente deseja mutar esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.send(`\`\`\`diff\n- MEMBRO MUTADO\n- Motivo: ${args}\`\`\``)
//                message.cache.send('teste')     
            })
        })
    },
};
