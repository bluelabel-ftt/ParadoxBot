module.exports = {
	name: 'clear',
    description: 'Limpa de 1 a 99 Mensagens em um Canal Expecifico',
    cooldown: 3,
	aliases: ['limpar', 'apagar'],
	usage: '[1 a 99]',
	guildOnly: true,
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('Não parece ser um número válido.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('É necessário colocar um número entre 1 e 99.');
		} else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.reply(`Você precisa da permissão **Gerenciar Mensagens**`)
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Ocorreu um erro ao tentar apagar mensagens neste canal!');
		})
	}
}