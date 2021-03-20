import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
module.exports.run = function(client: AlcanClient, message: Message, args: Array<string>): void {
	let responses = message.lang.responses;
	let embed = new MessageEmbed()
		.setDescription(args.join(' '))
		.setColor(client.color)
		.setFooter(client.footer)
		.addField(message.lang.ans, responses[Math.floor(Math.random() * responses.length)]);
	message.channel.send(embed);
}

module.exports.help = {
	name: '8ball',
	aliases: [],
	description: 'Ask bot',
	descriptionpl: 'Spytaj bota',
	category: '4fun', // Tools, Moderation, 4fun, dev
	perm: 'user' // user, admin, mod, tester, dev
};
