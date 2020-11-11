module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 3,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};