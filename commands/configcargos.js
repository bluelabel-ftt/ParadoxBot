const { Guild, GuildManager, RoleManager } = require('discord.js');
//const { RoleManager } = require("discord.js");
const { prefix } = require('../config.json');
module.exports = {
	name: 'configcargos',
    description: 'Configura todos os cargos necessarios para que o bot funcione!',
    guildOnly: true,
    execute(message, args) {
        let role = message.guild.roles.cache.find(role => role.name === "mutadoparadox")
        if (cargo === undefined) {
            message.guild.roles.create({ data: {name: 'mutadoparadox', color: 'BLUE', mentionable: 'false'}})
            return message.reply('cargos configurados! (lembre-se o cargo ``mutadoparadox`` deve estar acima dos membros comuns preferencialmente)')
        } else {
            message.reply('os cargos já foram configurados! (lembre-se o cargo ``mutadoparadox`` deve estar acima dos membros comuns preferencialmente)')
            //message.guild.channels.cache.forEach(f => {f.overwritePermissions(role, {SEND_MESSAGES: false})})
        }

    }
}