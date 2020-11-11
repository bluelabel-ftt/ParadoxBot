const { dono } = require('../config.json');
module.exports = {
	name: 'say',
    description: 'Faz o bot dizer uma frase',
    dono: true,
    aliases: ['dizer'],
    usage: '[frase]',
    args: true,
    execute(message, args) {

        const mChannel = message.mentions.channels.first()
    
        message.delete()
        if (mChannel) {
          argsresult = args.slice(1).join(' ')
          mChannel.send(argsresult)
        } else {
          argsresult = args.join(' ')
          message.channel.send(argsresult)
        }
      }
    }
