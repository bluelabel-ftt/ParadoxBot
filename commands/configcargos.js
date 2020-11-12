const { prefix } = require('../config.json');
module.exports = {
	name: 'configcargos',
    description: 'Muta um usuario',
    guildOnly: true,
    execute(message, args) {
        if(!message.guild.roles.cache.find(a => a.name === "mutadoparadox")){
            message.guild.roles.create({ data: {name: 'mutadoparadox', color: 'BLACK', mentionable: 'false'}})
            //message.guild.channels.cache.forEach(channel => {channel.createOverwrite(role, {SEND_MESSAGES: false, SPEAK: false})});
            return message.reply(`cargos configurados!`)
        } else {
            return message.reply(`os cargos já foram configurados!`)
        }
    }
}
