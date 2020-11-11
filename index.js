const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, dono } = require('./config.json');

const chalk = require('chalk');

const cooldowns = new Discord.Collection();

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`Bot Carregado!`);
});



client.on('message', message => {

	/*if (message.channel.type === 'text') {
		return console.log(chalk.yellowBright('[LOG COMANDO]'), `Server: '${message.guild.name}' | Canal: '${message.channel.name}' | Usuário ${message.author.tag}: ${message.content}`);
	};*/

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;

	if (command.dono && message.author.id !== dono)
		return message.channel.send(`Você não é uma pessoa especial, ${message.author}`);
	
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Não posso executar esse comando dentro dos DMs!');
	}
	
	if (command.args && !args.length) {
		let reply = `Não forneceu nenhum argumento, ${message.author}!`;

		if (command.usage) {
			reply += `\nO uso adequado do comando é: \`${prefix}${command.name} ${command.usage}\``;
		}
		
		return message.channel.send(reply);
	}

	//console.log(chalk.yellowBright('[LOG COMANDO]'), `Server: '${message.guild.name}' | Canal: '${message.channel.name}' | Usuário ${message.author.tag}: ${message.content}`);
	
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`Por favor espere ${timeLeft.toFixed(1)} segundos para utilizar o comando \`${prefix}${command.name}\` novamente.`);
	}}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Houve um erro ao tentar executar esse comando!');
	}

	});

	//console.log(chalk.greenBright('[LOG MENSAGEM]'), `[Server: '${client.message.guild.name}' | Canal: '${client.message.channel.name}' | Usuário ${client.message.author.username}#${client.message.author.discriminator}: ${client.message.content}]`);
//console.log(chalk.greenBright('[LOG MENSAGEM]'), `[Server: '${client.message.guild.name}' | Canal: '${client.message.channel.name}' | Usuário ${client.message.author.username}#${client.message.author.discriminator}: ${client.message.content}]`);
client.login(token);