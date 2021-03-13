import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
module.exports = async (client: AlcanClient, message: Message, args: Array<string>) => {
	let embed = new MessageEmbed()
		.setTitle('Ping')
		.setColor(client.color)
		.setFooter(client.footer)
		.setDescription('Pong')
		.addField(message.lang.ping, client.ws.ping + 'ms');
	message.channel.send(embed);
};

module.exports.help = {
	name: 'ping',
	aliases: ['delay', 'latency'],
	description: "Check bot's ping",
	descriptionpl: 'Sprawdź ping bota',
	category: 'Tools', // Tools, Moderation, 4fun, dev
	perm: 'user' // user, admin, mod, tester, dev
};
