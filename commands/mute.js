const { prefix } = require('../config.json');
module.exports = {
	name: 'mute',
    description: 'Muta um usuario',
    args: true,
    guildOnly: true,
    execute(message, args) {
        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (membro === message.member) {
            return message.reply(`Você nao pode mutar você mesmo.`) 
        } else {
            

        }
        


    }
}